'use client'

import {useContextMenu} from "@/zustand/useContextMenu";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {errorCatch} from "@/app/api/api.helper";

import InputCustom from "@/components/input/InputCustom";
import {PatternFormat} from "react-number-format";
import FormLayouts from "@/app/layouts/FormLayouts";

import {QueryContactCarrier} from "@/app/api/query/query-contact-carrier";
import {ICarrierContact} from "@/interface/interface-carrier-contact";
import SelectCarrier from "@/app/(home)/create/registry-select/select/carrier/SelectCarrier";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function CarrierContactEditing() {
    const { id } = useContextMenu();

    const { data } = useQuery({
        queryKey: ['get-carrier-contact-id',id],
        queryFn: () => QueryContactCarrier.getId(Number(id)),
    });
    const {  handleSubmit, control,  } = useForm<ICarrierContact>({
        defaultValues: {
            ...data,
        },
    });
    const send = useReactQuerySubscription({query:'update-carrier-contact', tracking:'carrier-contact'})
    const { mutate } = useMutation({
        mutationKey: ['update-carrier'],
        mutationFn: (data: ICarrierContact) => QueryContactCarrier.update(data,id),
        onSuccess: async () => {
            send({operation:'invalidate',entity:['get-all-carrier-contact','get-carrier-contact-id']})
            toast.success('Запись обнавлена');
        },
        onError: (error) => {
            const err = errorCatch(error);
            toast.error(err);
        },
    });
    const onSubmit: SubmitHandler<ICarrierContact> = (data) => {
        mutate(data);
    };
    return (
        <FormLayouts buttonVariant={'editing'} handleFn={handleSubmit(onSubmit)} label={'Сохранить'}>
            <div >
                <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <InputCustom   onValueChange={onChange} value={value} label={'ФИО'}/>
                    )}
                    name="fullName"
                />
            </div>
            <div >

                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
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
                                    target: { value: v.value },
                                })
                            }
                            format="+7 (###) ###-##-##"
                        />
                    )}
                    name={'numberPhone'}
                />
            </div>
            <div className={'flex gap-x-2'}>
                    <SelectCarrier  control={control} field={'carrierId'} />
            </div>
        </FormLayouts>
    );
};