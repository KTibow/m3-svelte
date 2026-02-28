import { Variant } from "@ktibow/material-color-utilities-nightly";
export type SpecVersion = "2021" | "2025" | "2026";

type VariantConfig = {
  id: Variant;
  name: string;
  desc: string;
  versions: SpecVersion[];
};

const variants: VariantConfig[] = [
  {
    id: Variant.TONAL_SPOT, // 2
    name: "Tonal Spot",
    desc: "Classic",
    versions: ["2021", "2025"],
  },
  {
    id: Variant.CMF, // 9
    name: "CMF",
    desc: "Color, Material, Finish?",
    versions: ["2026"],
  },
  {
    id: Variant.CONTENT, // 6
    name: "Content",
    desc: "Exact source color",
    versions: ["2021"],
  },
  {
    id: Variant.FIDELITY, // 5
    name: "Fidelity",
    desc: "Exact source color",
    versions: ["2021"],
  },
  {
    id: Variant.VIBRANT, // 3
    name: "Vibrant",
    desc: "Vivid colors all around",
    versions: ["2021", "2025"],
  },
  {
    id: Variant.EXPRESSIVE, // 4
    name: "Expressive",
    desc: "Harmoniously rotated",
    versions: ["2021", "2025"],
  },
  {
    id: Variant.RAINBOW, // 7
    name: "Rainbow",
    desc: "Vivid primary, drab rest",
    versions: ["2021"],
  },
  {
    id: Variant.FRUIT_SALAD, // 8
    name: "Fruit salad",
    desc: "Spin the chroma around",
    versions: ["2021"],
  },
  {
    id: Variant.NEUTRAL, // 1
    name: "Neutral",
    desc: "Almost grayscale",
    versions: ["2021", "2025"],
  },
  {
    id: Variant.MONOCHROME, // 0
    name: "Monochrome",
    desc: "Grayscale",
    versions: ["2021"],
  },
];

export default variants;
