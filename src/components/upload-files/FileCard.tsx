import {IFile} from "@/interface/interface-file";
import {getColorByExtension} from "@/styles/getColorByExtension";
import {getExtensionFromFileName} from "@/styles/getExtensionFromFileName";
import {isImage} from "@/utils/isImage";
import Image from "next/image";
import cn from "classnames";
import {getIconByExtension} from "@/styles/getIconByExtension";
import Link from "next/link";
import DeleteFile from "@/components/upload-files/DeleteFile";

export default function FileCard({file}: { file: IFile }) {
    if (!file) return 'Список документов пуст'
    const ext = getExtensionFromFileName(file.filename);
    const imageUrl =
        ext && isImage(ext) ? "http://localhost:5000/uploads/" + file.filename : "";
    const color = getColorByExtension(ext);
    const urlFile = `http://localhost:5000/uploads/${file.filename}`;
    const Icon = getIconByExtension(ext);

    function decodeFilename(encodedStr: string) {
        const decoder = new TextDecoder('utf-8');
        const bytes = new Uint8Array(encodedStr.split('').map(char => char.charCodeAt(0)));
        return decoder.decode(bytes);
    }

    return (

        <li className={'relative overflow-hidden cursor-pointer w-full flex justify-between items-center p-1 rounded-sm shadow-[0px_0px_3px_1px_#006F87] ease-in-out duration-300  hover:shadow-[inset_0px_0px_3px_1px_#006F87]'}>
            {isImage(ext) ? (

                <Link href={urlFile} legacyBehavior passHref>
                    <a target={"_blank"}>
                            <div className={'flex w-full h-[60px] gap-x-2  items-center  '}>
                                <div className={'flex flex-1'}>
                                    <Image className={'aspect-video'} rel={'preload'} width={60} height={60} src={imageUrl}   alt={decodeFilename(file.originalname)}/>
                                </div>
                                <p className={' line-clamp-1 text-text'}> {decodeFilename(file.originalname)}</p>
                            </div>
                    </a>
                </Link>
            ) : (

                <Link href={urlFile} legacyBehavior passHref>
                    <a target={"_blank"}>

                            <div key={file.originalname}
                                className={cn(`w-full h-[60px] items-center  gap-x-2 text-${color}  flex  `,)}>
                        <span style={{color: color}}
                              className={cn(`flex items-center justify-center text-[40px] `)}>{Icon &&
                            <Icon className={`text-${color}`}/>}</span>
                                <p className={'line-clamp-1  text-text'}>  {decodeFilename(file.originalname)}</p>
                            </div>

                    </a>
                </Link>
            )}
    <div >
        <DeleteFile id={file.id}/>
    </div>
        </li>

    );
};