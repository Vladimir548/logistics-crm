import { useQueryClient } from '@tanstack/react-query';
import { Control, Controller, FieldValues, Path, useWatch } from 'react-hook-form';
import SelectCostumerContact from "@/app/(home)/create/registry-select/select/costumer/SelectCostumerContact";

import { useEffect } from "react";
import { QueryCostumer } from "@/app/api/query/QueryCostumer";
import CostumerCreate from "@/app/costumer/_ui/CostumerCreate";
import Combobox from "@/components/combobox/Combobox";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

interface ISelectCostumer<T extends FieldValues> {
    control: Control<T>;
    field: Path<T>;
    fieldContact?: Path<T>;
}

export default function SelectCostumer<T extends FieldValues>({ control, field, fieldContact }: ISelectCostumer<T>) {
    const queryClient = useQueryClient();
    const send = useReactQuerySubscription({query:'update-costumer', tracking:'costumer'})
    const costumerId = useWatch({
        control,
        name: field,
    });

    useEffect(() => {
        if (costumerId) {
            queryClient.invalidateQueries({
                queryKey: ['get-costumer-id-contact'],
            });
        }
    }, [costumerId, queryClient]);
    useEffect(() => {
        send({operation:'invalidate',entity:'costumer-get-all'})
    }, [send]);

    return (
        <div className={'flex flex-col gap-y-2'}>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Combobox
                        nameField="name"
                        queryKey={['costumer-get-all']}
                        queryFn={( pageParam, search ) => QueryCostumer.getAll( {query:search,page:pageParam})}
                        onValueChange={onChange}
                        controllerValue={value}
                        label="Заказчик"
                        addRecord={<CostumerCreate />}
                    />
                )}
                name={field}
            />
            {fieldContact && (
                <SelectCostumerContact  control={control} id={Number(costumerId)} field={fieldContact} />
            )}
        </div>
    );
}
