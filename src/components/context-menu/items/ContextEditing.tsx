'use client';
import { ContextMenuItem } from '@/components/context-menu/ContextMenu';
import Link from "next/link";
import {Button} from "@/components/buttons/Buttons";



export default function ContextEditing({id,url}:{id:number | string,url:string}) {

  return (
          <ContextMenuItem onSelect={(e: Event) => e.preventDefault()}>
              <Button variant={"editing"} asChild>
            <Link className={'w-full'} href={`${url}/editing/${id}`}
            >
             Редактировать запись
            </Link>
              </Button>
          </ContextMenuItem>
  );
}
