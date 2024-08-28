
import {FaRegFileExcel, FaRegFilePdf, FaRegFileZipper} from "react-icons/fa6";
import {BsFiletypeDoc, BsFiletypeDocx, BsFiletypeJpg, BsFiletypePng, BsFiletypeTxt} from "react-icons/bs";
import {IconType} from "react-icons";

const extIcon: Record<string, IconType> = {
    pdf: FaRegFilePdf,
    xls: FaRegFileExcel ,
    doc: BsFiletypeDoc ,
    docx: BsFiletypeDocx ,
    txt: BsFiletypeTxt  ,
    png: BsFiletypePng ,
    jpg: BsFiletypeJpg ,
    jpeg: BsFiletypeJpg,
    zip: FaRegFileZipper ,
    rar: FaRegFileZipper ,
} as const;

export type Extension = keyof typeof extIcon;
export type Icon = typeof extIcon[Extension];

export const getIconByExtension = (ext: string): Icon => {
    return extIcon[ext];
};