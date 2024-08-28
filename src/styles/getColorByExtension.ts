import {IconType} from "react-icons";

const extColor : Record<string, string> = {
    pdf: "#ef4444",
    xls: "#10b981",
    doc: "#3b82f6",
    docx: "#2563eb",
    txt: "#6b7280",
    png: "#8b5cf6",
    jpg: "#8b5cf6",
    jpeg: "#8b5cf6",
    zip: "#facc15",
    rar: "#facc15",
} as const;

export type Extension = keyof typeof extColor;
export type Color = typeof extColor[Extension];

export const getColorByExtension = (ext: string): Color => {
    return extColor[ext];
};