
import {Button, buttonVariants} from "@/components/buttons/Buttons";
import {type VariantProps} from "class-variance-authority";
import {useRouter} from "next/navigation";
import {IoChevronBackOutline} from "react-icons/io5";
type ButtonVariantProps = VariantProps<typeof buttonVariants>;
interface IFormLayout {
    children:React.ReactNode,
    label:'Создать' | 'Сохранить',
    handleFn:React.FormEventHandler<HTMLFormElement>
    buttonVariant:  ButtonVariantProps['variant']
}


export default function FormLayouts({children,label,handleFn,buttonVariant}:IFormLayout) {
    const {back}=useRouter()
    return (
        <form onSubmit={handleFn} className={' h-screen border-text-dark border p-2  rounded-md'}>


            <div className="flex justify-between w-full border-b border-text mb-2">
                <Button className={'flex items-center '} type={'button'} onClick={()=>back()} variant={'default'}><IoChevronBackOutline size={20} /> Назад</Button>
                <Button variant={buttonVariant}
                        type={'submit'}
                >
                    {label}
                </Button>
            </div>
            <div className={'flex  gap-2 flex-wrap'}>
                {children}
            </div>
        </form>
    );
};