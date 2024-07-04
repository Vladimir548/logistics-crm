import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import { IFormData } from '@/services/auth/auth.types';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth/auth.service';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import InputCustom from "@/components/input/InputCustom";
import {Button} from "@/components/buttons/Buttons";
import InputPassword from "@/components/input/InputPassword";
export default function LoginForm() {

  const {register,handleSubmit,reset,control} =useForm<IFormData>()
  const {replace} = useRouter()
  const {mutate} =useMutation({
    mutationKey:['login'],
    mutationFn:(data:IFormData) => authService.login(data),
    onSuccess: ()=>{
      toast.success('Вход выполнен успешно');
      replace('/');
      reset();
    },
    onError:()=>{
      toast.error('Вход не выполнен, проверьте данные');
    }
  })
  const onSubmit:SubmitHandler<IFormData> = (data:IFormData)=>{
    mutate(data)

  }
  return (
    <div className={'border border-border rounded-lg p-3 w-[320px] h-[280px]'}>
      <div className="">
        <h2 className={'text-2xl flex justify-center  pb-4'}>Вход</h2>
      <form method='POST' className={'flex flex-col gap-y-6'} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-1 flex-col gap-y-5 justify-center items-center  h-full">
        <div className=" w-full">
          <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                  <InputCustom className={'w-[300px]'} startContent={<span
                      className={'text-text'}><MdAlternateEmail
                      size={20}/></span>}  onValueChange={onChange} value={value}
                               label={'Логин'}/>
              )}
              name="login"
          />

        </div>
        <div className=" w-full">
          <Controller
              control={control}
              render={({field: {onChange, value}}) => (

                  <InputPassword startContent={<span
                      className={' text-text '}><RiLockPasswordLine
                      size={20}/></span>} className={'w-[300px]'} onValueChange={onChange} value={value}
                                 label={'Пароль'}/>
              )}
              name="password"
          />
        </div>
        </div>
        <div className="flex justify-center items-center">
          <Button type="submit" variant={'add'}>Войти</Button>
        </div>
      </form>
      </div>
    </div>
  );
};