
import {Button, buttonVariants} from "@/components/buttons/Buttons";
import {type VariantProps} from "class-variance-authority";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
interface IFormLayout {
    children:React.ReactNode,
    label:'Создать' | 'Сохранить',
    handleFn:React.FormEventHandler<HTMLFormElement>
    buttonVariant:  ButtonVariantProps['variant']

}
export default function FormLayouts({children,label,handleFn,buttonVariant}:IFormLayout) {

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleFn(e);
    };
    return (
        <form   onSubmit={onSubmit}  className={' h-full border-text-dark border p-2  rounded-md'}>
            <div className={'flex justify-end w-full items-center border-b border-text mb-2'}>
                <Button variant={buttonVariant} type={'submit'}>
                    {label}
                </Button>
            </div>
            <div className={'flex  gap-2 flex-wrap '}>
                {children}
            </div>
        </form>
    );
};