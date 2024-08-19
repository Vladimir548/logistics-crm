'use client';

import React, {Suspense} from 'react';
import Sidebar from "@/components/sidebar/Sidebar";
import {ScrollArea, ScrollBar} from "@/components/scroll-area/ScrollArea";

export default function HomeLayout({ children,scroll=true }: { children: React.ReactNode,scroll?:boolean }) {
  return (
    <div className={'w-full h-screen flex gap-x-2  overflow-hidden'}>
      <div className="w-[300px] h-full rounded-md overflow-y-auto   ">
        <Sidebar />
      </div>
        <div className="relative overflow-hidden   w-full h-full bg-secondary-cust rounded-md ">
            <main className="flex  overflow-auto h-full ">
                {scroll ? (
                <ScrollArea className={' w-full h-full  '} >
                    <Suspense fallback={null}>
                     {children}
                    </Suspense>
                    <ScrollBar  orientation="horizontal" />
                </ScrollArea>
                ) : <div className={'w-full h-full'}>{children}</div>}
            </main>
        </div>
    </div>
);
}
