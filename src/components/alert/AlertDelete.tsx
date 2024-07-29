'use client'

import {ContextMenuItem} from "@/components/context-menu/ContextMenu";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/alert/Alert";
import {Button} from "@/components/buttons/Buttons";
import {MdDelete} from "react-icons/md";

export default function AlertDelete({context,onDelete}:{context:boolean,onDelete:()=>void}) {
    return (
        <>
            {context ? (
        <ContextMenuItem
            onSelect={(e: Event) => e.preventDefault()}
            className={'flex  flex-col gap-y-2 w-full'}
        >
            <AlertDialog>
                <AlertDialogTrigger asChild className={'w-full'}>
                    <Button
                        variant={'delete'}
                    >
            <span>
              <MdDelete size={20} />
            </span>
                        <p>Удалить запись</p>
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className={'bg-secondary-cust/50 border border-text backdrop-blur-2xl '}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Внимание! Вы уверены, что хотите удалить этот элемент? Все зависимые
                            элементы также будут удалены.
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className={'flex justify-end items-center gap-x-2'}>
                        <AlertDialogCancel asChild>
                            <Button
                                variant={'default'}
                            >
                                Закрыть
                            </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button variant={'delete'}
                                    onClick={() => onDelete()}

                            >
                                Удалить
                            </Button>
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </ContextMenuItem>
            ) : (
                <AlertDialog>
                    <AlertDialogTrigger asChild className={'w-full'}>
                        <Button
                            variant={'delete'}
                        >
            <span>
              <MdDelete size={20} />
            </span>
                            <p>Удалить запись</p>
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className={'bg-secondary-cust/50 border border-text backdrop-blur-2xl '}>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Внимание! Вы уверены, что хотите удалить этот элемент? Все зависимые
                                элементы также будут удалены.
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className={'flex justify-end items-center gap-x-2'}>
                            <AlertDialogCancel asChild>
                                <Button
                                    variant={'default'}
                                >
                                    Закрыть
                                </Button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button variant={'delete'}
                                        onClick={() => onDelete()}

                                >
                                    Удалить
                                </Button>
                            </AlertDialogAction>
                        </div>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
};