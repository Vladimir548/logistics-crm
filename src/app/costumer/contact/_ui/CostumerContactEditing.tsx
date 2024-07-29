'use client'

import {useContextMenu} from "@/zustand/useContextMenu";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {errorCatch} from "@/app/api/api.helper";

import InputCustom from "@/components/input/InputCustom";
import {PatternFormat} from "react-number-format";
import FormLayouts from "@/app/layouts/FormLayouts";
import {QueryContactCostumer} from "@/app/api/query/query-contact-costumer";
import {ICostumerContact} from "@/interface/interface-costumer-contact";
import SelectCostumer from "@/app/(home)/create/registry-select/select/costumer/SelectCostumer";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function CostumerContactEditing() {
    const { id } = useContextMenu();

    const { data } = useQuery({
        queryKey: ['get-costumer-id',id],
        queryFn: () => QueryContactCostumer.getId(Number(id)),
    });
    const {  handleSubmit, control,  } = useForm<ICostumerContact>({
        defaultValues: {
            ...data,
        },
    });
    const send = useReactQuerySubscription({query:'update-contact-costumer', tracking:'contact-costumer'})
    const { mutate } = useMutation({
        mutationKey: ['update-contact-costumer'],
        mutationFn: (data: ICostumerContact) => QueryContactCostumer.update(data,id),
        onSuccess: async () => {
            send({operation:'invalidate',entity:['get-all-costumer-contact','get-costumer-id','get-costumer-id-contact']})
            toast.success('Запись обнавлена');
        },
        onError: (error) => {
            const err = errorCatch(error);
            toast.error(err);
        },
    });
    const onSubmit: SubmitHandler<ICostumerContact> = (data) => {
        mutate(data);
    };
    return (
        <FormLayouts  buttonVariant={'editing'} handleFn={handleSubmit(onSubmit)} label={'Сохранить'}>

            <div className="flex  gap-2 flex-wrap">
                <div className={'flex flex-col gap-x-2'}>
                    <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <InputCustom onValueChange={onChange} value={value} label={'ФИО'}/>
                        )}
                        name="fullName"
                    />
                </div>
                <div className={'flex flex-col gap-x-2'}>

                    <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <PatternFormat
                                customInput={InputCustom}
                                label={'Номер телефона'}
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
                                format="+7 (###) ###-##-##"
                            />
                        )}
                        name={'numberPhone'}
                    />
                </div>
                <div className={'flex flex-col gap-x-2'}>

                        <SelectCostumer control={control} field={'costumerId'}/>

                </div>
            </div>


        </FormLayouts>
    );
};