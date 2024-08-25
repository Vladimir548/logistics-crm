import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import cn from "classnames";



 const buttonVariants = cva(
    "inline-flex items-center justify-center  whitespace-nowrap gap-x-2  text-md font-medium transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-transparent border border-text-dark text-text-dark shadow hover:bg-text-dark/30",
                add:
                    "bg-transparent text-green-600 border border-green-600 shadow-sm hover:bg-green-600/30",
                editing:
                    "bg-transparent text-yellow-600 border border-yellow-600 shadow-sm hover:bg-yellow-600/30",
                delete:
                    "bg-transparent border border-red-600 text-red-600 shadow-sm hover:bg-red-600/30",
                ghost: "hover:bg-accent hover:bg-text/10",
                link: "text-primary underline-offset-4 hover:underline",
                'no-style':'',
                icon:''
            },
            radius:{
                sm:'rounded-sm',
                md:'rounded-md',
                lg:'rounded-lg',
                xl:'rounded-xl',

            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-[35px] w-[35px] ",
                full:'w-full h-full py-1',
                'no-style':''
            },

        },
        defaultVariants: {
            variant: "default",
            size: "default",
            radius:'md'
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className,  variant, size, radius, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, radius, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
