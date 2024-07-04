import HomeLayout from "@/app/layouts/HomeLayout";
import CarrierContactCreate from "@/app/carrier/contact/_ui/CarrierContactCreate";


export default function Page() {
    return (
        <div>
            <HomeLayout>
                <CarrierContactCreate/>
            </HomeLayout>

        </div>
    );
};