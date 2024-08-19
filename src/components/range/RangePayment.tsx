'use client'
import InputCustom from "@/components/input/InputCustom";
import {NumericFormat} from "react-number-format";
interface IRangePayment {
    getFromValue: (value: string) => void;
    getToValue: (value: string) => void;
    valueFrom:string | number
    valueTo:string | number
}

export default function RangePayment({getToValue,getFromValue,valueTo,valueFrom}:IRangePayment) {
    return (
        <div className={'flex justify-between items-center gap-x-2'}>
            <NumericFormat
                customInput={InputCustom}
                value={valueFrom}
                label={'Мин. сумма'}
                suffix=" ₽"
                allowNegative
                thousandSeparator=" "
                onValueChange={(value) => getFromValue(value.value)}
            />
            <span className={'text-text'}>
            &mdash;
                </span>
            <NumericFormat
                customInput={InputCustom}
                value={valueTo}
                label={'Макс. сумма'}
                suffix=" ₽"
                allowNegative
                thousandSeparator=" "
                onValueChange={(value) => getToValue(value.value)}
            />

        </div>
    );
};