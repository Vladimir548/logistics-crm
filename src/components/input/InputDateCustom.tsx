'use client'
import { DateInputProps, DatePicker} from "@nextui-org/react";
import {I18nProvider} from "@react-aria/i18n";
import style from './style.module.scss'
export default function InputDateCustom(props:DateInputProps) {
    return (
        <I18nProvider locale="ru">
    <DatePicker visibleMonths={2} {...props} variant={'bordered'} className={'w-[200px]'}  classNames={{
        base:style.input,

        calendar:' dark:bg-secondary-cust/70 backdrop-blur shadow shadow-border/50 ',
        calendarContent:`text-text bg-secondary-cust/70 backdrop-blur  ${style.calendar}`,
    }} />
        </I18nProvider>
    );
};