'use client'

import {useContextMenu} from "@/zustand/useContextMenu";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {errorCatch} from "@/app/api/api.helper";
import InputCustom from "@/components/input/InputCustom";
import {PatternFormat} from "react-number-format";
import FormLayouts from "@/app/layouts/FormLayouts";
import SelectCarrier from "@/app/(home)/create/registry-select/select/carrier/SelectCarrier";
import {QueryDriver} from "@/app/api/query/QueryDriver";
import {IDriver} from "@/interface/interface-driver";
import InputDateCustom from "@/components/input/InputDateCustom";
import {parseDate} from "@internationalized/date";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function CarrierDriverEditing() {
    const { id } = useContextMenu();

    const { data } = useQuery({
        queryKey: ['get-driver-id',id],
        queryFn: () => QueryDriver.getId(Number(id)),
    });
    const send = useReactQuerySubscription({query:'update-driver', tracking:'driver'})
    const {  handleSubmit, control,  } = useForm<IDriver>({
        defaultValues: {
            ...data,
            passportIssueDate:data?.passportIssueDate?.split('T')[0],
            dateOfIssueOfDriversLicense:data?.dateOfIssueOfDriversLicense?.split('T')[0]
        },
    });
    const { mutate } = useMutation({
        mutationKey: ['update-carrier'],
        mutationFn: (data: IDriver) => QueryDriver.update(data,id),
        onSuccess: async () => {
            send({operation:'invalidate',entity:['get-all-driver','get-driver-id']})
            toast.success('Запись обнавлена');
        },
        onError: (error) => {
            const err = errorCatch(error);
            toast.error(err);
        },
    });
    const onSubmit: SubmitHandler<IDriver> = (data) => {
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
            <div >
                {!id && (
                    <SelectCarrier control={control} field={'carrierId'} />
                )}
            </div>
            <div >
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PatternFormat
                            customInput={InputCustom}
                            label={'Серия и номер паспорта'}
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
                            format="## ## ######"
                        />
                    )}
                    name={'passportNumberAndSeries'}
                />
            </div>
            <div >
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputDateCustom onChange={(value) => onChange(value?.toString())}
                                         value={value ? parseDate(value) : undefined} label={'Дата выдачи паспорта'} />
                    )}
                    name="passportIssueDate"
                />
            </div>
            <div >

                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputCustom   onValueChange={onChange} value={value} label={'Кем выдан'}/>
                    )}
                    name="whoIssuedThePassports"
                />
            </div>

            <div >
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PatternFormat
                            customInput={InputCustom}
                            label={'Код подразделения'}
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
                            format="###-###"
                        />
                    )}
                    name={'passportSubdivisionCode'}
                />
            </div>
            <div >
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PatternFormat
                            customInput={InputCustom}
                            label={'Серия и номер ВУ'}
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
                            format="## ## ######"
                        />
                    )}
                    name={'driversLicenseSeriesAndNumber'}
                />
            </div>
            <div >

                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputDateCustom onChange={(value)=>onChange(value?.toString())} value={value ? parseDate(value) : undefined} label={'Дата выдачи ВУ'} />
                    )}
                    name="dateOfIssueOfDriversLicense"
                />
            </div>
        </FormLayouts>
    );
};