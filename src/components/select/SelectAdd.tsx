import {Dialog, DialogContent, DialogPortal, DialogTrigger} from "@/components/modal/Modal";
import {Button} from "@/components/buttons/Buttons";
import {FiPlus} from "react-icons/fi";
import React, {ReactElement} from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/tooltip/Tooltip"
export default function SelectAdd({element}:{element:ReactElement}) {
    return (
        <Dialog>
                <TooltipProvider  >
                    <Tooltip >
                        <TooltipTrigger asChild >
            <DialogTrigger asChild >
                            <Button size={"no-style"} className={'p-0'} type={'button'} variant={'default'}><FiPlus  size={21} /></Button>
            </DialogTrigger>
                        </TooltipTrigger>
                <DialogPortal>
                        <DialogContent className={' w-[80%] h-[80%] backdrop-blur-2xl  '}>
                            <div className={'w-full'} >
                                {element}
                            </div>
                        </DialogContent>
                </DialogPortal>
                        <TooltipContent>
                            <p>Новая запись</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
        </Dialog>
    );
};