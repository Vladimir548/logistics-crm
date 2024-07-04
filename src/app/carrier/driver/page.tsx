import HomeLayout from "@/app/layouts/HomeLayout";
import CarrierDriver from "@/app/carrier/driver/_ui/CarrierDriver";


export default function Page() {
    return (
        <div>
            <HomeLayout>
                <CarrierDriver/>
            </HomeLayout>

        </div>
    );
};