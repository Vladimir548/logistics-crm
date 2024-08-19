'use client'

import {Button} from "@/components/buttons/Buttons";

export default function ClearFilter({clearFn}: {clearFn: ()=>void}) {
    return (
       <Button variant={'delete'} onClick={clearFn} >
           Очистить
       </Button>
    );
};