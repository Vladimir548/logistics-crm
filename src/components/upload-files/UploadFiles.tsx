'use client'

import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/modal/Modal";
import {Button} from "@/components/buttons/Buttons";
import UploadFile from "@/components/upload-files/UploadFile";
import FilesList from "@/components/upload-files/FilesList";
import {ScrollArea} from "@/components/scroll-area/ScrollArea";

export default function UploadFiles({id}:{id:number}) {

    return (
        <Dialog>
            <DialogTrigger asChild className={'w-full'}>

                    <Button variant={"default"}>
                        <p>Добавить файл</p>
                    </Button>
            </DialogTrigger>

            <DialogContent className={'bg-black/80 backdrop-blur-2xl flex flex-col w-[70%] h-[80%]    '}>
                <ScrollArea className={'h-full'}>
                <DialogHeader>
                    <DialogTitle className={'text-text pb-2'}>Добавление файла</DialogTitle>
                </DialogHeader>
                <div className={'flex items-center gap-2 flex-col w-full pr-3'}>
                <UploadFile id={id}/>
                    <FilesList id={id}/>
                </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};