'use client'
import Link from 'next/link';
import { DATALINK } from '@/data/data-link';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import style from './style.module.scss'
import {ScrollArea} from "@/components/scroll-area/ScrollArea";
export default function SidebarNav() {
  const [isOpen, setIsOpen] = useState<number[]>([]);
  const toggleOpenSubMenu = (navId: number) => {
    const subMenuList = isOpen.some((id) => id === navId);
    if (!subMenuList) {
      setIsOpen([...isOpen, navId]);
    } else {
      setIsOpen(isOpen.filter((id) => id !== navId));
    }
  };

  return (
      <ScrollArea className={' w-full h-full '}>
    <ul className={'p-1 overflow-auto h-full text-text '}>
      {DATALINK.map((nav) => (
        <li key={nav.id} className={''}>
          <div
            className={
              'flex px-1 items-center justify-between cursor-pointer rounded-md my-1  w-full py-2 pl-1  ease-in-out  duration-300   hover:hover:bg-[#00FDEE77]'
            }
          >
            <>
              {nav.link ? (
                <Link
                  className={`flex items-center gap-x-2 my-1 w-full ${nav.subLink && ' border-r border-white/50'} `}
                  href={nav?.link}
                >
                  <span>{nav.label}</span>
                </Link>
              ) : (
                <div
                  onClick={() => toggleOpenSubMenu(nav.id)}
                  className={`flex items-center gap-x-2 w-full ${nav.subLink && ' border-r border-white/50'} `}
                >
                  <span>{nav.label}</span>
                </div>
              )}
            </>
            {nav.subLink && (
              <span
                onClick={() => toggleOpenSubMenu(nav.id)}
                className={`duration-300  px-1 ease-linear ${isOpen.some((id) => id === nav.id) ? ' transform rotate-180' : ''}`}
              >
                <IoIosArrowDown size={24} />
              </span>
            )}
          </div>
          {nav.subLink && isOpen.some((id) => id === nav.id) && (
            <ul>
              {nav.subLink.map((sub) => (
                <li key={sub.id}>
                  <Link
                    className={
                      'flex  items-center gap-x-2 rounded-md my-1 ease-in-out duration-300 w-full py-2 pl-3 hover:bg-[#00FDEE77]'
                    }
                    href={sub.link}
                  >
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
      </ScrollArea>
  );
}
