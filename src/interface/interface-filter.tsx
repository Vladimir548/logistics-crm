
import {StatusOrder} from "@/interface/interface-registry";

export interface IFilterResponse {
    [key: string]: any;
    periodFrom: string | undefined;
    periodTo: string | undefined;
    costumers: number[];
    carriers: number[];
    paymentFrom: string;
    paymentTo: string;
    deltaFrom: string;
    deltaTo: string;
    paymentFromCarrier: string;
    paymentToCarrier: string;
    prepaymentFrom: string
    prepaymentTo: string;
    statusApplication:StatusOrder[]
    statusAgreement:StatusOrder[]
}