'use client'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import InputCustom from "@/components/input/InputCustom";
import FormLayouts from "@/app/layouts/FormLayouts";
import {useContextMenu} from "@/zustand/useContextMenu";
import {useEffect} from "react";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {errorCatch} from "@/app/api/api.helper";
import {QueryAccountNumber} from "@/app/api/query/query-account-number";
import {IAccountNumber} from "@/interface/interface-account-number";

export default function AccountNumberEditing() {
    const { id } = useContextMenu();
    useEffect(()=>{

    },[id])
    const send = useReactQuerySubscription({query:'update-account',tracking:'account'})
    const {  handleSubmit, control }  =  useForm<IAccountNumber>({
        defaultValues: async () => QueryAccountNumber.getIdAccount(Number(id)),
    });
    const { mutate } = useMutation({
        mutationKey: ['update-account'],
        mutationFn: (data: IAccountNumber) => QueryAccountNumber.update(Number(id),data ),
        onSuccess: () => {
            toast.success('Запись обновлена');
            send({
                operation:'invalidate',
                entity:['get-all-account-number','all-registry','get-all-invoice'],
            })
        },
        onError: (error) => {
            const err = errorCatch(error);
            toast.error(err);
        },
    });

    const onSubmit: SubmitHandler<IAccountNumber> = (data) => {
        mutate(data);
    };
    return (
        <FormLayouts buttonVariant={'editing'} handleFn={handleSubmit(onSubmit)} label={'Сохранить'}>
            <div className="flex  gap-2 flex-wrap">
                <div>
                    <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <InputCustom min={20}
                                         max={20}
                                         minLength={20}
                                         maxLength={20} onValueChange={onChange} value={value} label={'Номер счета'}/>
                        )}
                        name="account"
                    />

                </div>
            </div>
        </FormLayouts>
    );
};