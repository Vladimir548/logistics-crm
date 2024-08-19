'use client'
import {useSearchParams} from "next/navigation";
import {useCallback} from "react";
import {IStatusOrder} from "@/data/data-status-order";

interface QueryParams {
    [key: string]: number[] | string | string[] | undefined | IStatusOrder[];
}
export default function useClearQueryString() {
    const searchParams = useSearchParams();

    const clearQueryString = useCallback((queryParams: QueryParams) => {
        const params = new URLSearchParams(searchParams.toString());
        for (const key in queryParams) {
            if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
                params.delete(key);
            }
        }
        return decodeURIComponent(params.toString());
    }, [searchParams]);
      return clearQueryString
};