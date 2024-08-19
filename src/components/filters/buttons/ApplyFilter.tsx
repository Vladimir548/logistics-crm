'use client'

import {Button} from "@/components/buttons/Buttons";

export default function ApplyFilter({filterFn}: {filterFn: ()=>void}) {

    return (
        <Button variant={'add'} onClick={filterFn} >
            Фильтровать
        </Button>
    );
};