'use client';

import React from 'react';
import Sidebar from "@/components/sidebar/Sidebar";
import {ScrollArea, ScrollBar} from "@/components/scroll-area/ScrollArea";
import Link from "next/link";


export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'w-full h-screen flex gap-x-2  overflow-hidden'}>
      <div className="w-[300px] h-full rounded-md overflow-y-auto   ">

        <Sidebar />

      </div>
        <div className="relative overflow-hidden   w-full h-full bg-secondary-cust rounded-md ">
            <main className="flex  overflow-auto h-full ">
                <ScrollArea className={' w-full h-full '}>
                    {children}
                    <ScrollBar  orientation="horizontal" />
                </ScrollArea>
            </main>
        </div>
    </div>
);
}
