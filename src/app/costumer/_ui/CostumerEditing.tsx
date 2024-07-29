'use client'

import {useContextMenu} from "@/zustand/useContextMenu";
import {useMutation, useQuery, } from "@tanstack/react-query";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {errorCatch} from "@/app/api/api.helper";
import {QueryCostumer} from "@/app/api/query/QueryCostumer";
import {ICostumer} from "@/interface/interface-costumer";
import InputCustom from "@/components/input/InputCustom";
import {PatternFormat} from "react-number-format";
import FormLayouts from "@/app/layouts/FormLayouts";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function CostumerEditing() {
    const { id } = useContextMenu();

    const { data } = useQuery({
        queryKey: ['get-costumer-id',id],
        queryFn: () => QueryCostumer.getId(Number(id)),
    });
    const {  handleSubmit, control,  } = useForm<ICostumer>({
        defaultValues: {
            ...data,
        },
    });
    const send = useReactQuerySubscription({query:'update-costumer', tracking:'costumer'})
    const { mutate } = useMutation({
        mutationKey: ['update-costumer'],
        mutationFn: (data: ICostumer) => QueryCostumer.update(id,data),
        onSuccess: async () => {
            send({
                operation:'invalidate',
                entity:['get-all-costumer','get-costumer-id','costumer-get-all']
            })
            toast.success('Запись обнавлена');
        },
        onError: (error) => {
            const err = errorCatch(error);
            toast.error(err);
        },
    });
    const onSubmit: SubmitHandler<ICostumer> = (data) => {
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