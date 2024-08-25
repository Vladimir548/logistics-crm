'use client'

import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {authService} from "@/services/auth/auth.service";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/modal/Modal";
import {Button} from "@/components/buttons/Buttons";
import FormLayouts from "@/app/layouts/FormLayouts";
import InputCustom from "@/components/input/InputCustom";
import {FaUserPen} from "react-icons/fa6";
import {MdAlternateEmail} from "react-icons/md";
import SelectCustom from "@/components/select/SelectCustom";
import {ROLE} from "@/data/data-roles";
import {SelectItem} from "@/components/select/Select";
import { IFormData} from "@/services/auth/auth.types";
import {RiLockPasswordLine} from "react-icons/ri";

export default function ProfileCreateUser() {
    const send = useReactQuerySubscription({query:'update-user', tracking:'user'})
    const {handleSubmit, control  } = useForm<IFormData>();

    const {mutate} = useMutation({
        mutationKey:['create-user'],
        mutationFn:(data:IFormData)=>authService.create(data),
        onSuccess: () => {
            toast.success('Пользователь создан');
            send({operation:'invalidate',entity:['get-all-users','get-user-id']})
        },
        onError: () => {
            toast.error('Ошибка при создание');
        },
    })
    const onSubmit: SubmitHandler<IFormData> = (data) => {
        mutate(data);
    };
    return (

        <Dialog>
            <DialogTrigger asChild className={'w-full'}>
                <Button   radius={"sm"} variant={"add"}>
                    <p>Создать пользователя</p>
                </Button>
            </DialogTrigger>

            <DialogContent  className={'bg-black/80 backdrop-blur-2xl max-w-[500px] flex flex-col  '}>
                <DialogHeader>
                    <DialogTitle className={'text-text'}>Создание пользователя</DialogTitle>
                </DialogHeader>
                <FormLayouts label={'Создать'} handleFn={handleSubmit(onSubmit)} buttonVariant={"add"}>
                    <div className="flex flex-col gap-y-4 ">
                        <div className={'relative'}>
                            <Controller
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <InputCustom
                                        startContent={<span className={'text-text'}> <FaUserPen size={18}/></span>}
                                        isRequired className={'w-[350px]'} onValueChange={onChange} value={value}
                                        label={'ФИО'}/>
                                )}
                                name="fio"
                            />
                        </div>
                        <div className={'relative'}>

                            <Controller
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <InputCustom startContent={<span className={'text-text'}> <MdAlternateEmail
                                        size={18}/></span>} isRequired className={'w-[350px]'} onValueChange={onChange}
                                                 value={value} label={'Логин'}/>
                                )}
                                name="login"
                            />
                        </div>
                        <div className={'relative'}>
                            <Controller
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <InputCustom startContent={<span className={'text-text'}><RiLockPasswordLine
                                        size={18}/></span>} isRequired className={'w-[350px]'} onValueChange={onChange}
                                                 value={value} label={'Пароль'}/>
                                )}
                                name="password"
                            />
                        </div>
                        <div className={'relative'}>
                            <Controller
                                control={control}
                                render={({field: {onChange, value}}) => (
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
                </FormLayouts>
            </DialogContent>
        </Dialog>

    );
};