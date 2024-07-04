'use client';

import {
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from '@/components/context-menu/ContextMenu';

const RegistryComment = lazy(
  () => import('@/app/(home)/_ui/registry-context-menu/registry-add-info/RegistryComment'),
);
const RegistryTickets = lazy(
  () => import('@/app/(home)/_ui/registry-context-menu/registry-add-info/RegistryTickets'),
);
import { IoIosArrowForward } from 'react-icons/io';
import { lazy } from 'react';
import {Button} from "@/components/buttons/Buttons";

export default function RegistryAddInfo() {
  return (
    <ContextMenuSub>
        <Button   className={'w-full '} variant={'add'}>
      <ContextMenuSubTrigger>
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
