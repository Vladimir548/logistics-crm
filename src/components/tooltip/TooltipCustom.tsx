'use client'
import * as Tooltip from '@radix-ui/react-tooltip';
import React from "react";

interface ITooltipProps {
    children: React.ReactNode;
    label:string,
    duration?:number
    skipDuration?:number
}

export default function TooltipCustom({children,label,duration,skipDuration}:ITooltipProps) {
    return (
        <Tooltip.Provider  delayDuration={duration ? duration : 500} skipDelayDuration={skipDuration ? skipDuration : 200}  >
            <Tooltip.Root  >
                <Tooltip.Trigger asChild  >
                    {children}
                </Tooltip.Trigger>

                <Tooltip.Content  sideOffset={2} className={'h-full z-10 break-all  w-full bg-secondary-cust text-text backdrop-blur-lg max-w-[400px] rounded-lg border border-text  p-2 '}>
                    {label}
                </Tooltip.Content>

            </Tooltip.Root>
        </Tooltip.Provider>
    );
};