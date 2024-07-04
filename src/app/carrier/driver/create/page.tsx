import HomeLayout from "@/app/layouts/HomeLayout";
import CarrierDriverCreate from "@/app/carrier/driver/_ui/CarrierDriverCreate";


export default function Page() {
    return (
        <div>
                <HomeLayout>
                    <CarrierDriverCreate/>
                </HomeLayout>
        </div>
    );
};