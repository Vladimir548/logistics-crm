'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorCatch } from '@/app/api/api.helper';
import { PatternFormat } from 'react-number-format';
import { IDriver } from '@/interface/interface-driver';
import HomeLayout from '@/app/layouts/HomeLayout';
import {QueryDriver} from "@/app/api/query/QueryDriver";

import SelectCarrier from "@/app/(home)/create/registry-select/select/carrier/SelectCarrier";
import InputCustom from "@/components/input/InputCustom";
import InputDateCustom from "@/components/input/InputDateCustom";
import {parseDate} from "@internationalized/date";
import {Button} from "@/components/buttons/Buttons";
import FormLayouts from "@/app/layouts/FormLayouts";

export default function CarrierDriverCreate() {
  const { handleSubmit, control, reset } = useForm<IDriver>({});

  const { mutate } = useMutation({
    mutationKey: ['create-carrier-driver'],
    mutationFn: (data: IDriver) => QueryDriver.create(data),
    onSuccess: () => {
      reset();
      toast.success('Запиись добавлена');
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
      <FormLayouts buttonVariant={'add'} handleFn={handleSubmit(onSubmit)} label={'Создать'}>
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

              <SelectCarrier control={control} field={'carrierId'} />
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
                        <InputDateCustom onChange={(value)=>onChange(value?.toString())} value={value ? parseDate(value) : undefined} label={'Дата выдачи паспорта'} />
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
}
