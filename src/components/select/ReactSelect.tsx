'use client'
import Select from 'react-select'
import {DATASTATUSORDER} from "@/data/data-status-order";
export default function ReactSelect() {
    return (
        <div>
            <Select  classNames={{
                placeholder:()=>
                    ` text-text`,
                container: (state) =>(
                     `border ${state.isFocused ? 'border-text' : 'border-border' }   text-text rounded-md`
                ),
                menuList:()=>(
                    'bg-border rounded-md'
                ),
                control:()=>
                    'bg-secondary-cust !important border-border text-text',
                singleValue:()=>
                    'text-text',
                input:()=>
                    'text-text',
                dropdownIndicator:()=>
                    'text-text !important',
                indicatorSeparator:()=>
                    'bg-text !important'


            }} className={'border-border bg-secondary-cust'} options={DATASTATUSORDER} />
        </div>
    );
};