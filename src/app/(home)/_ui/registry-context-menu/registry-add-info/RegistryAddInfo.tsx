'use client';

import {
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from '@/components/context-menu/ContextMenu';
import RegistryComment from "@/app/(home)/_ui/registry-context-menu/registry-add-info/RegistryComment";
import RegistryTickets from "@/app/(home)/_ui/registry-context-menu/registry-add-info/RegistryTickets";
import { IoIosArrowForward } from 'react-icons/io';
import { lazy } from 'react';
import {Button} from "@/components/buttons/Buttons";

export default function RegistryAddInfo() {
  return (
    <ContextMenuSub>
        <Button   className={'w-full flex items-center '} variant={'add'}>
      <ContextMenuSubTrigger className={'w-full flex items-center '}  >
       <p>Добавление информации</p>
        <span>
          <IoIosArrowForward />
        </span>
      </ContextMenuSubTrigger>
        </Button>

      <ContextMenuSubContent
        sideOffset={30}
        className="w-52 border-border border-2 bg-secondary-cust "
      >
          <RegistryComment />

          <RegistryTickets />

      </ContextMenuSubContent>
    </ContextMenuSub>
  );
}
