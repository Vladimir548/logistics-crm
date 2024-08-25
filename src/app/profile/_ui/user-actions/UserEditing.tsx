'use client'

import {useMutation} from "@tanstack/react-query";
import {authService} from "@/services/auth/auth.service";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/modal/Modal";
import {Button} from "@/components/buttons/Buttons";
import FormLayouts from "@/app/layouts/FormLayouts";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IUser} from "@/interface/interface-user";
import InputCustom from "@/components/input/InputCustom";
import {FaUserPen} from "react-icons/fa6";
import {MdAlternateEmail} from "react-icons/md";
import SelectCustom from "@/components/select/SelectCustom";
import {ROLE} from "@/data/data-roles";
import {SelectItem} from "@/components/select/Select";
import toast from "react-hot-toast";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function UserEditing({id} : {id: number}) {
    const send = useReactQuerySubscription({query:'update-user', tracking:'user'})
    const {handleSubmit, control  } = useForm<IUser>({
        defaultValues:async  ()=> authService.userId(id)
    });

    const {mutate} = useMutation({
        mutationKey:['editing-user'],
        mutationFn:(data:IUser)=>authService.editing(id,data),
        onSuccess: () => {
            toast.success('Данные пользователя обновлены');
            send({operation:'invalidate',entity:['get-all-users','get-user-id']})
        },
        onError: () => {

            toast.error('Ошибка при обновлении данных');
        },
    })
    const onSubmit: SubmitHandler<IUser> = (data) => {
        mutate(data);
    };
    return (

            <Dialog>
                <DialogTrigger asChild className={'w-full'}>
                        <Button  className={'w-full'} size={"full"} radius={"sm"} variant={"editing"}>
                            <p>Редактировать пользователя</p>
                        </Button>
                </DialogTrigger>

                <DialogContent className={'bg-black/80 backdrop-blur-2xl flex flex-col  '}>
                    <DialogHeader>
                        <DialogTitle className={'text-text'}>Редактирование пользователя</DialogTitle>
                    </DialogHeader>
                    <FormLayouts label={'Сохранить'} handleFn={handleSubmit(onSubmit)} buttonVariant={"editing"}>
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
                                            size={18}/></span>} isRequired className={'w-[350px]'}
                                                     onValueChange={onChange} value={value} label={'Логин'}/>
                                    )}
                                    name="login"
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