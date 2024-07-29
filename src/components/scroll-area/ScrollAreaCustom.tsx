'use client'

import * as ScrollArea from '@radix-ui/react-scroll-area';
import {forwardRef, HTMLAttributes, ReactNode} from "react";
interface ScrollAreaCustomProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;

}
 const  ScrollAreaCustom = forwardRef<HTMLDivElement, ScrollAreaCustomProps>(({ children,style, ...props }, ref) =>  {

    return (
        <ScrollArea.Root >
            <ScrollArea.Viewport  className={'relative'}  style={{ ...style, overflowX: 'auto', overflowY: 'auto' }} {...props} ref={ref} >
                {children}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
                className="flex touch-none z-10    rounded-md select-none  bg-text-dark  h-full w-[10px]  p-0.5 data-[orientation=vertical]:w-2.5"
                orientation="vertical"
            >
                <ScrollArea.Thumb className="relative flex-1 w-[10px] rounded-[10px] bg-text" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
                className="flex select-none z-10   touch-none p-0.5 bg-text-dark    data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="horizontal"
            >
                <ScrollArea.Thumb className="flex-1 bg-text rounded-[10px] relative h-[10px]  " />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="bg-text-dark" />
        </ScrollArea.Root>
    )
});

 export default ScrollAreaCustom;