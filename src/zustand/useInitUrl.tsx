import {useSearchParams} from "next/navigation";
import {useEffect, useRef} from "react";
import {IStatusOrder} from "@/data/data-status-order";
type ParamValue = number | string | IStatusOrder;
export default function useInitUrl<T extends ParamValue>(name: string,fn: (val: T) => void, value: T[]) {
    const searchParams = useSearchParams();
    const isInitialized = useRef(false);
    useEffect(() => {
        if (isInitialized.current) return;
        const dataParam = searchParams.get(name);
        if (dataParam) {
            const dataArray = dataParam.split(',').map(val => isNaN(Number(val)) ? val as T : Number(val) as T);
            dataArray.forEach(val => {
                if (!value.includes(val)) {
                    fn(val);
                }
            });
        }
        if (value && searchParams.size === 0){
            value =[]
        }
        isInitialized.current = true;
    }, [searchParams,value]);

};