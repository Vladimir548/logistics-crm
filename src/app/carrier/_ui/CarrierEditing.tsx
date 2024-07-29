'use client'

import {useContextMenu} from "@/zustand/useContextMenu";
import {useMutation, useQuery,} from "@tanstack/react-query";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {errorCatch} from "@/app/api/api.helper";

import InputCustom from "@/components/input/InputCustom";
import {PatternFormat} from "react-number-format";
import FormLayouts from "@/app/layouts/FormLayouts";
import {QueryCarrier} from "@/app/api/query/query-carrier";
import {ICarrier} from "@/interface/interface-carrier";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function CarrierEditing() {
    const { id } = useContextMenu();
    const send = useReactQuerySubscription({query:'update-carrier', tracking:'carrier'})
    const { data } = useQuery({
        queryKey: ['get-costumer-id',id],
        queryFn: () => QueryCarrier.getId(Number(id)),
    });
    const {  handleSubmit, control,  } = useForm<ICarrier>({
        defaultValues: {
            ...data,
        },
    });
    const { mutate } = useMutation({
        mutationKey: ['update-carrier'],
        mutationFn: (data: ICarrier) => QueryCarrier.update(data,id),
        onSuccess: async () => {
            send({operation:'invalidate',entity:['get-all-carrier','get-costumer-id']})
            toast.success('Запись обнавлена');
        },
        onError: (error) => {
            const err = errorCatch(error);
            toast.error(err);
        },
    });
    const onSubmit: SubmitHandler<ICarrier> = (data) => {
        mutate(data);
    };
    return (
        <FormLayouts  buttonVariant={'editing'} handleFn={handleSubmit(onSubmit)} label={'Сохранить'}>
            <div >
                <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <InputCustom onValueChange={onChange} value={value} label={'Название'}/>
                    )}
                    name="name"
                />
            </div>
            <div >
                <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <InputCustom onValueChange={onChange} value={value} label={'Юридический и фактический адрес'}/>
                    )}
                    name="legalAndActualAddress"
                />
            </div>
            <div >
                <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <InputCustom onValueChange={onChange} value={value} label={'Почтовый адрес'}/>
                    )}
                    name="mailingAddress"
                />
            </div>
            <div >
                <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <InputCustom minLength={12}
                                     maxLength={12} onValueChange={onChange} value={value} label={'ИНН'}/>
                    )}
                    name="inn"
                />
            </div>
            <div >

                <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <PatternFormat
                            customInput={InputCustom}
                            label={'ОГРН'}
                            allowEmptyFormatting
                            mask="_"
                            className={'fieldCreate w-[200px]'}
                            value={value}
                            onValueChange={(v) =>
                                onChange({
                                    type: 'text',
                                    target: {value: v.value},
                                })
                            }
                            format={'#-##-##-##-#####-#'}
                        />
                    )}
                    name={'ogrn'}
                />
            </div>
            <div >
                <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <InputCustom minLength={9}
                                     maxLength={9} onValueChange={onChange} value={value} label={'КПП'}/>
                    )}
                    name="kpp"
                />
            </div>
            <div >
                <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <InputCustom onValueChange={onChange} value={value} label={'Банк'}/>
                    )}
                    name="bank"
                />
            </div>
            <div >
                <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <InputCustom minLength={20}
                                     maxLength={20} onValueChange={onChange} value={value} label={'Расчетный счет'}/>
                    )}
                    name="checkingAccount"
                />
            </div>
            <div >

                <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <InputCustom minLength={20}
                                     maxLength={20} onValueChange={onChange} value={value} label={'Кассовый счет'}/>
                    )}
                    name="cashAccount"
                />
            </div>
            <div >
                <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <InputCustom minLength={9}
                                     maxLength={9} onValueChange={onChange} value={value} label={'БИК'}/>
                    )}
                    name="bic"
                />
            </div>
        </FormLayouts>
    );
};