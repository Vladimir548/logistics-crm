'use client';

import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import { IFormData } from '@/services/auth/auth.types';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth/auth.service';
import toast from 'react-hot-toast';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaUserPen } from 'react-icons/fa6';
import { ROLE } from '@/data/data-roles';

import { errorCatch } from '@/app/api/api.helper';
import InputCustom from "@/components/input/InputCustom";
import SelectCustom from "@/components/select/SelectCustom";
import {SelectItem} from "@/components/select/Select";
import {Button} from "@/components/buttons/Buttons";

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
      control,
    formState: { errors },
  } = useForm<IFormData>();
  const { replace } = useRouter();
  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: IFormData) => authService.register(data),
    onSuccess: () => {
      toast.success('Регистрация прошла успешно');
      reset();
      replace('/profile');
    },
    onError: (error) => {
      const err = errorCatch(error);
      toast.error(err);
    },
  });
  const onSubmit: SubmitHandler<IFormData> = (data) => {
    mutate(data);
  };
  return (
    <div className={'w-full min-h-screen flex justify-center items-center   '}>
      <div className=" border border-text p-2 rounded-md w-[320px] h-full">
        <h2 className={'text-2xl flex justify-center text-text  pb-4'}>Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4 ">
            <div className={'relative'}>
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom startContent={<span className={'text-text'} > <FaUserPen size={18} /></span>} isRequired className={'w-[350px]'} onValueChange={onChange} value={value} label={'ФИО'}/>
                  )}
                  name="fio"
              />
            </div>
            <div className={'relative'}>

              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom startContent={ <span className={'text-text'} > <MdAlternateEmail size={18} /></span>} isRequired className={'w-[350px]'} onValueChange={onChange} value={value} label={'Логин'}/>
                  )}
                  name="login"
              />
            </div>
            <div className={'relative'}>
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom startContent={ <span className={'text-text'} ><RiLockPasswordLine size={18} /></span>} isRequired className={'w-[350px]'} onValueChange={onChange} value={value} label={'Пароль'}/>
                  )}
                  name="password"
              />
            </div>
            <div className={'relative'}>
              <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                      <SelectCustom
                          label={'Роль'}
                          className={'w-full'}
                          onValueChange={onChange}
                          value={value}
                      >
                        {ROLE?.map((value) => (
                            <SelectItem key={value.id} value={value.value}>
                              {value.label}
                            </SelectItem>))}
                      </SelectCustom>
                  )}
                  name={'role'}
              />
            </div>
          </div>
          <div className={'flex justify-center py-2'}>

            <Button type={"submit"} variant={'add'}>Зарегистрироваться</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
