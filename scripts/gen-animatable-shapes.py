# /// script
# dependencies = ["numpy", "svgpathtools"]
# ///

import re

import numpy as np
from svgpathtools import Line, parse_path

# Read shapes
with open("./src/lib/misc/shapes.ts", "r") as f:
    content = f.read()

pattern = r'export const (path\w+) =\s*"([^"]+)"'
shapes = re.findall(pattern, content, re.DOTALL)

center_x, center_y = 190, 190
pixel_triangle_center = (121.0, 190.0)


def densely_sample_path(path_str):
    """Sample path extremely densely to ensure we have points at all angles."""
    path = parse_path(path_str)
    all_points = []

    for segment in path:
        # For lines, sample at reasonable density
        # For curves, sample very densely
        if isinstance(segment, Line):
            num_samples = 50
        else:
            segment_length = segment.length()
            num_samples = max(100, int(segment_length / 0.2))  # Every 0.2 units

        for i in range(num_samples + 1):
            t = i / num_samples
            all_points.append(segment.point(t))

    return all_points


def convert_shape_guaranteed_720(path_str, center, num_rays=720):
    """
    Conversion that GUARANTEES exactly num_rays points.
    For each angle, we MUST find a point - no exceptions.
    """
    center_x, center_y = center

    # Densely sample the path
    all_points = densely_sample_path(path_str)

    # Build angle lookup: for each angle, store ALL points near that angle
    angle_buckets = {}
    angular_resolution = (2 * np.pi) / num_rays

    for point in all_points:
        dx = point.real - center_x
        dy = point.imag - center_y

        angle = np.arctan2(dy, dx)
        if angle < 0:
            angle += 2 * np.pi

        radius = np.sqrt(dx * dx + dy * dy)

        # Assign to the nearest angle bucket
        bucket_idx = int(angle / angular_resolution) % num_rays

        if bucket_idx not in angle_buckets:
            angle_buckets[bucket_idx] = []

        angle_buckets[bucket_idx].append((radius, point.real, point.imag))

    # Generate exactly num_rays points
    result = []

    for i in range(num_rays):
        target_angle = (i / num_rays) * 2 * np.pi

        if i in angle_buckets and len(angle_buckets[i]) > 0:
            # Have points in this bucket - use the furthest one
            best = max(angle_buckets[i], key=lambda x: x[0])
            radius, x, y = best
        else:
            # No points in this bucket - interpolate from neighbors
            # Find nearest non-empty buckets
            left_idx = i - 1
            right_idx = i + 1

            # Search left
            while left_idx >= 0 and left_idx not in angle_buckets:
                left_idx -= 1
            if left_idx < 0:
                left_idx = num_rays - 1
                while left_idx > i and left_idx not in angle_buckets:
                    left_idx -= 1

            # Search right
            while right_idx < num_rays and right_idx not in angle_buckets:
                right_idx += 1
            if right_idx >= num_rays:
                right_idx = 0
                while right_idx < i and right_idx not in angle_buckets:
                    right_idx += 1

            # Interpolate between left and right
            if left_idx in angle_buckets and right_idx in angle_buckets:
                left_best = max(angle_buckets[left_idx], key=lambda x: x[0])
                right_best = max(angle_buckets[right_idx], key=lambda x: x[0])

                # Linear interpolation of radius
                left_angle = (left_idx / num_rays) * 2 * np.pi
                right_angle = (right_idx / num_rays) * 2 * np.pi

                # Handle wraparound
                if right_angle < left_angle:
                    right_angle += 2 * np.pi
                if target_angle < left_angle:
                    target_angle += 2 * np.pi

                if right_angle - left_angle > 0:
                    t = (target_angle - left_angle) / (right_angle - left_angle)
                else:
                    t = 0.5

                radius = left_best[0] + t * (right_best[0] - left_best[0])
                x = center_x + radius * np.cos(target_angle % (2 * np.pi))
                y = center_y + radius * np.sin(target_angle % (2 * np.pi))
            else:
                # Fallback: use center (shouldn't happen for closed shapes)
                radius = 0
                x = center_x
                y = center_y

        result.append(
            {
                "angle": target_angle % (2 * np.pi),
                "radius": radius,
                "x": float(x),
                "y": float(y),
            }
        )

    return result


def polar_to_svg_path(polar_points):
    """Convert polar points to SVG path string."""
    if not polar_points:
        return ""

    path_parts = [f"M{polar_points[0]['x']:.1f} {polar_points[0]['y']:.1f}"]
    for point in polar_points[1:]:
        path_parts.append(f"L{point['x']:.1f} {point['y']:.1f}")
    path_parts.append("Z")

    return " ".join(path_parts)


# Convert ALL shapes
print("Converting all shapes with GUARANTEED 720 points each...")
print()

converted_shapes = []

for name, path_str in shapes:
    print(f"Converting {name}...")

    if name == "pathPixelTriangle":
        center = pixel_triangle_center
    else:
        center = (center_x, center_y)

    polar_points = convert_shape_guaranteed_720(path_str, center, num_rays=720)

    # Verify count
    if len(polar_points) != 720:
        print(f"  ERROR: Generated {len(polar_points)} points instead of 720!")
        continue

    new_path = polar_to_svg_path(polar_points)
    converted_shapes.append((name.replace("path", "pathAnimatable"), new_path, center))

    # Verify path has correct number of commands
    l_count = new_path.count(" L")
    if l_count != 719:
        print(f"  ERROR: Path has {l_count} L commands instead of 719!")

print(f"\n✓ Converted {len(converted_shapes)} shapes!")
print("✓ All shapes have exactly 720 points!")

# Write output
output_lines = [
    "// 35 shapes",
    "// 0,0,380,380 viewport",
    "// 720 points",
    "",
]

for name, path, center in converted_shapes:
    output_lines.append(f'export const {name} = "{path}";')
    output_lines.append("")

output_lines.append("// Center points used for polar conversion:")
output_lines.append(f"// Default center: ({center_x}, {center_y})")
output_lines.append(
    f"// pathPixelTriangle: ({pixel_triangle_center[0]:.1f}, {pixel_triangle_center[1]:.1f}) - moved LEFT to avoid vertical wall blocking"
)

with open("./src/lib/misc/shapesAnimatable.ts", "w") as f:
    f.write("\n".join(output_lines))

print("\n✓ Output written!")
