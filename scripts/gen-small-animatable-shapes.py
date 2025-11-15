# /// script
# dependencies = ["numpy", "svgpathtools"]
# ///

import re

import numpy as np
from svgpathtools import Line, parse_path

# Read original shapes
with open("./src/lib/misc/shapes.ts", "r") as f:
    content = f.read()

pattern = r'export const (path\w+) =\s*"([^"]+)"'
all_shapes = dict(re.findall(pattern, content, re.DOTALL))

# Select smooth shapes only (no sharp corners, pixels, or spiky features)
smooth_shapes = {
    "pathCircle": all_shapes["pathCircle"],
    "pathOval": all_shapes["pathOval"],
    "pathPill": all_shapes["pathPill"],
    "pathPentagon": all_shapes["pathPentagon"],
    "pathSunny": all_shapes["pathSunny"],
    "pathFourSidedCookie": all_shapes["pathFourSidedCookie"],
    "pathSixSidedCookie": all_shapes["pathSixSidedCookie"],
    "pathSevenSidedCookie": all_shapes["pathSevenSidedCookie"],
    "pathNineSidedCookie": all_shapes["pathNineSidedCookie"],
    "pathTwelveSidedCookie": all_shapes["pathTwelveSidedCookie"],
    "pathSoftBurst": all_shapes["pathSoftBurst"],
    "pathSoftBoom": all_shapes["pathSoftBoom"],
    "pathFlower": all_shapes["pathFlower"],
    "pathPuffy": all_shapes["pathPuffy"],
    "pathPuffyDiamond": all_shapes["pathPuffyDiamond"],
    "pathFourLeafClover": all_shapes["pathFourLeafClover"],
    "pathEightLeafClover": all_shapes["pathEightLeafClover"],
}

# Instead of scaling by viewbox (380 -> 48), scale the shape itself (380 -> 38)
# Center was at 190,190 -> should be at 24,24
shape_scale_factor = 38 / 380
old_center = (190, 190)
new_center = (24, 24)

# Use fewer points for smooth shapes
num_points = 120  # Much less than 720, but enough for smooth curves


def densely_sample_path(path_str):
    """Sample path densely."""
    path = parse_path(path_str)
    all_points = []

    for segment in path:
        if isinstance(segment, Line):
            num_samples = 30
        else:
            segment_length = segment.length()
            num_samples = max(50, int(segment_length / 0.5))

        for i in range(num_samples + 1):
            t = i / num_samples
            all_points.append(segment.point(t))

    return all_points


def convert_shape_smooth(path_str, num_rays=120):
    """Convert smooth shape with fewer points."""
    center_x, center_y = old_center

    # Sample path
    all_points = densely_sample_path(path_str)

    # Build angle buckets
    angle_buckets = {}
    angular_resolution = (2 * np.pi) / num_rays

    for point in all_points:
        dx = point.real - center_x
        dy = point.imag - center_y

        angle = np.arctan2(dy, dx)
        if angle < 0:
            angle += 2 * np.pi

        radius = np.sqrt(dx * dx + dy * dy)

        bucket_idx = int(angle / angular_resolution) % num_rays

        if bucket_idx not in angle_buckets:
            angle_buckets[bucket_idx] = []

        angle_buckets[bucket_idx].append((radius, point.real, point.imag))

    # Generate points
    result = []

    for i in range(num_rays):
        target_angle = (i / num_rays) * 2 * np.pi

        if i in angle_buckets and len(angle_buckets[i]) > 0:
            best = max(angle_buckets[i], key=lambda x: x[0])
            radius, x, y = best
        else:
            # Interpolate from neighbors
            left_idx = (i - 1) % num_rays
            right_idx = (i + 1) % num_rays

            while left_idx != i and left_idx not in angle_buckets:
                left_idx = (left_idx - 1) % num_rays

            while right_idx != i and right_idx not in angle_buckets:
                right_idx = (right_idx + 1) % num_rays

            if left_idx in angle_buckets and right_idx in angle_buckets:
                left_best = max(angle_buckets[left_idx], key=lambda x: x[0])
                right_best = max(angle_buckets[right_idx], key=lambda x: x[0])

                # Simple average for smooth shapes
                radius = (left_best[0] + right_best[0]) / 2
                x = center_x + radius * np.cos(target_angle)
                y = center_y + radius * np.sin(target_angle)
            else:
                radius = 0
                x = center_x
                y = center_y

        # Scale shape itself (300 -> 38), center at new_center
        scaled_x = (x - old_center[0]) * shape_scale_factor + new_center[0]
        scaled_y = (y - old_center[1]) * shape_scale_factor + new_center[1]

        result.append({"x": float(scaled_x), "y": float(scaled_y)})

    return result


def polar_to_svg_path_optimized(points):
    """
    Convert to SVG with optimizations:
    - Use implicit lineto (coordinates after M without command)
    - Round to 1 decimal place for 48x48
    - Compact format
    """
    if not points:
        return ""

    # Start with M
    path = f"M{points[0]['x']:.1f} {points[0]['y']:.1f}"

    # Add remaining points without 'L' (implicit lineto)
    for point in points[1:]:
        path += f" {point['x']:.1f} {point['y']:.1f}"

    # Close
    path += "Z"

    return path


# Convert all smooth shapes
print(f"Converting {len(smooth_shapes)} smooth shapes...")
print("- Viewport: 48x48 (shape scaled from 300->38)")
print(f"- Points per shape: {num_points}")
print("- Optimized path syntax (implicit lineto)")
print()

converted = []

for name, path_str in smooth_shapes.items():
    print(f"Converting {name}...")
    points = convert_shape_smooth(path_str, num_rays=num_points)

    if len(points) != num_points:
        print(f"  WARNING: Got {len(points)} points instead of {num_points}")
        continue

    svg_path = polar_to_svg_path_optimized(points)
    converted.append((name.replace("path", "pathAnimatableSmall"), svg_path))

print(f"\n✓ Converted {len(converted)} shapes!")

# Write output
output_lines = [
    f"// {len(converted)} shapes (subset)",
    "// 0,0,48,48 viewport, 38x38 shapes",
    f"// {num_points} points",
    "",
]

for name, path in converted:
    output_lines.append(f'export const {name} = "{path}";')
    output_lines.append("")

# Add some stats
total_chars = sum(len(path) for _, path in converted)
avg_chars = total_chars / len(converted)
output_lines.append(
    f"// Stats: ~{avg_chars:.0f} chars/shape avg (vs ~9000 for 720pt versions)"
)

with open("./src/lib/misc/shapesAnimatableSmall.ts", "w") as f:
    f.write("\n".join(output_lines))

print("✓ Output written")
print(f"✓ Average path length: ~{avg_chars:.0f} characters")
print(f"✓ File size reduction: ~{(1 - avg_chars / 9000) * 100:.0f}% smaller per shape")

# Replace values="..." in LoadingIndicator.svelte with selected processed paths

# Order: soft burst, 9 sided cookie, pentagon, pill, sunny, 4 sided cookie, oval, soft burst again
loading_names = [
    "pathSoftBurst",
    "pathNineSidedCookie",
    "pathPentagon",
    "pathPill",
    "pathSunny",
    "pathFourSidedCookie",
    "pathOval",
    "pathSoftBurst",
]

# Build processed SVG paths for these shapes
loading_paths = []
for name in loading_names:
    # Use the same conversion as above
    points = convert_shape_smooth(all_shapes[name], num_rays=num_points)
    svg_path = polar_to_svg_path_optimized(points)
    loading_paths.append(svg_path)

loading_values_str = ";".join(loading_paths)

# Patch LoadingIndicator.svelte
li_path = "./src/lib/forms/LoadingIndicator.svelte"
with open(li_path, "r") as f:
    loading_content = f.read()

# Find first values="...". Replace from first values=" to first " after that.
# This regex matches values="...". Non-greedy.
loading_content_new = re.sub(
    r'values=".*?"',
    f'values="{loading_values_str}"',
    loading_content,
    count=1,
    flags=re.DOTALL,
)

with open(li_path, "w") as f:
    f.write(loading_content_new)

print("✓ LoadingIndicator.svelte values=... replaced with processed paths")
