
import {DATASTATUSORDER, IStatusOrder} from "@/data/data-status-order";
import {Checkbox} from "@/components/checkbox/Checkbox";
import {StatusOrder} from "@/interface/interface-registry";

interface IStatusOrderList {
    getValue:(val:StatusOrder) => void;
    values:StatusOrder[];
    idForLabel: string;
}

export default function StatusOrderList({getValue,values,idForLabel}:IStatusOrderList) {
    return (
        <ul >
            {DATASTATUSORDER.map((status) => (
                <li onClick={()=>getValue(status.value)} className={'relative cursor-pointer flex items-center py-2  border-b border-text-dark w-full hover:border-text group'} key={status.id} >
                   <Checkbox id={`${status.value}_${idForLabel}`} checked={values.some((value)=> value === status.value)} />
                       <label onClick={(e)=> e.stopPropagation()} className={'text-text text-base cursor-pointer pl-2 select-none '} htmlFor={`${status.value}_${idForLabel}`}>{status.label}</label>
                    <span className={'absolute left-1/2 bg-text h-0.5 rounded-md -translate-x-1/2 bottom-0 w-0 duration-300 ease-linear group-hover:w-full'}></span>
                </li>
            ))}
        </ul>
    );
};