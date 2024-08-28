import {IFile} from "@/interface/interface-file";
import {getColorByExtension} from "@/styles/getColorByExtension";
import {getExtensionFromFileName} from "@/styles/getExtensionFromFileName";
import {isImage} from "@/utils/isImage";
import Image from "next/image";
import cn from "classnames";
import {getIconByExtension} from "@/styles/getIconByExtension";
import TooltipCustom from "@/components/tooltip/TooltipCustom";

export default function FileCard({file}: { file: IFile }) {
    const ext = getExtensionFromFileName(file.filename);
    const imageUrl =
        ext && isImage(ext) ? "http://localhost:5000/uploads/" + file.filename : "";
    const color = getColorByExtension(ext);

    const Icon = getIconByExtension(ext);

    function decodeFilename(encodedStr: string) {
        const decoder = new TextDecoder('utf-8');
        const bytes = new Uint8Array(encodedStr.split('').map(char => char.charCodeAt(0)));
        return decoder.decode(bytes);
    }

    return (
        <div className={'relative overflow-hidden'}>
            {isImage(ext) ? (

                <TooltipCustom label={decodeFilename(file.originalname)} duration={0}>
                    <li className={'flex flex-col cursor-pointer'}>
                        <Image rel={'preload'} width={120} height={120} src={imageUrl}
                               alt={decodeFilename(file.originalname)}/>
                        <p className={'text-[12px] text-text'}> {decodeFilename(file.originalname)}</p>
                    </li>
                </TooltipCustom>
            ) : (

                <TooltipCustom label={decodeFilename(file.originalname)} duration={0}>
                    <li key={file.originalname} className={cn(`w-[120px] h-[100px] text-${color} flex flex-col cursor-pointer`,)}>
                        <span style={{color: color}}
                              className={cn(`flex items-center justify-center text-[80px] `)}>{Icon &&
                            <Icon className={`text-${color}`}/>}</span>
                        <p className={'text-[12px]  text-text'}>  {decodeFilename(file.originalname)}</p>
                    </li>
                </TooltipCustom>
            )}


        </div>
    );
};