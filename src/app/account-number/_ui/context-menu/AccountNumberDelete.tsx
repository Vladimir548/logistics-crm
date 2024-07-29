'use client'

import {useContextMenu} from "@/zustand/useContextMenu";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {QueryAccountNumber} from "@/app/api/query/query-account-number";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/alert/Alert";
import {Button} from "@/components/buttons/Buttons";
import {MdDelete} from "react-icons/md";
import {ContextMenuItem} from "@/components/context-menu/ContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function AccountNumberDelete() {
    const { id } = useContextMenu();
    const send = useReactQuerySubscription({query:'update-account',tracking:'account'})
    const { mutate } = useMutation({
        mutationKey: ['delete-account'],
        mutationFn: () => QueryAccountNumber.delete(id),
        onSuccess: async () => {
            send({
                operation:'invalidate',
                entity:['get-all-account-number','all-registry','get-all-invoice'],
            })
        },
        onError: () => {
            toast.error('Ошибка при удалении записи');
        },
    });
    return (
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
                                    onClick={() => mutate()}

                            >
                                Удалить
                            </Button>
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </ContextMenuItem>
    );
};