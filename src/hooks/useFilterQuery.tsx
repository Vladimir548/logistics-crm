import useCreateQueryString from "@/hooks/useCreateQueryString";
import {useFilters} from "@/zustand/useFilters";
import useClearQueryString from "@/hooks/useClearQueryString";

export const useFilterQuery = () => {
    const {
        periodFrom,
        periodTo,
        costumers,
        carriers,
        paymentFrom,
        paymentTo,
        prepaymentFrom,
        prepaymentTo,
        statusApplication,
        statusAgreement,
        paymentToCarrier,
        paymentFromCarrier,
        deltaTo,
        deltaFrom,
        clearPeriodFrom,
        clearPeriodTo,
        clearCostumers,
        clearCarriers,
        clearPaymentFrom,
        clearPaymentTo,
        clearPrepaymentFrom,
        clearPrepaymentTo,
        clearStatusApplication,
        clearStatusAgreement,
        clearPaymentFromCarrier,
        clearPaymentToCarrier,
        clearDeltaFrom,
        clearDeltaTo
    } = useFilters();

    const queryParams = {
        periodFrom,
        periodTo,
        costumers: costumers.length ? costumers : undefined,
        carriers: carriers.length ? carriers : undefined,
        paymentFrom,
        paymentTo,
        prepaymentFrom,
        prepaymentTo,
        statusAgreement,
        statusApplication,
        paymentToCarrier,
        paymentFromCarrier,
        deltaTo,
        deltaFrom,
    };
    const createQueryString = useCreateQueryString();
    const clearQueryString = useClearQueryString();

    const clearQuery = () => {
        clearPeriodFrom();
        clearPeriodTo();
        clearCostumers();
        clearCarriers();
        clearPaymentFrom();
        clearPaymentTo();
        clearPrepaymentFrom();
        clearPrepaymentTo();
        clearStatusApplication();
        clearStatusAgreement();
        clearPaymentFromCarrier();
        clearPaymentToCarrier();
        clearDeltaFrom();
        clearDeltaTo();

        return clearQueryString(queryParams);
    };


    const getQueryString = () => createQueryString(queryParams);
    return {getQueryString,clearQuery};

};

export default useFilterQuery;