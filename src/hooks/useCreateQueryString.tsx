'use client'
import { useSearchParams} from "next/navigation";
import {useCallback} from "react";
import {IStatusOrder} from "@/data/data-status-order";

interface QueryParams {
    [key: string]: number[] | string | string[] | undefined | IStatusOrder[];
}

export default function useCreateQueryString() {
    const searchParams = useSearchParams();
    const createQueryString = useCallback((queryParams: QueryParams) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(queryParams).forEach(([name, values]) => {
            if (Array.isArray(values)) {
                const newValues = Array.from(new Set(values.map(String)));
                if (newValues.length > 0) {
                    params.set(name, newValues.join(','));
                } else {
                    params.delete(name);
                }
            } else if (typeof values === 'string' && values.trim() !== '') {
                params.set(name, values);
            } else {
                params.delete(name);
            }
        });

        return decodeURIComponent(params.toString());
    }, [searchParams]);

    return createQueryString
};