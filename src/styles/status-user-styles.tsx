import {cva, type VariantProps} from "class-variance-authority";
import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import cn from "classnames";

const statusUserStyles = cva(
    " rounded-full absolute z-50 right-1 top-1",
    {
        variants: {
            variant: {
                ONLINE:
                    "bg-green-500",
                OFFLINE:
                    "bg-red-600",

            },
            size: {
                default: "w-2 h-2",
            },

        },
        defaultVariants: {
            variant: "OFFLINE",
            size: "default",
        },
    }
)

export interface SpanProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof statusUserStyles> {
    asChild?: boolean
}

 const IndicatorUser = React.forwardRef<HTMLSpanElement, SpanProps>(
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "span"
        return (
            <Comp
                className={cn(statusUserStyles({ variant, size, className }))}
        ref={ref}
        {...props}
        />
    )
    }
)
IndicatorUser.displayName = "IndicatorUser"

export { IndicatorUser }

