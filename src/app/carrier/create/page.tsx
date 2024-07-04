import HomeLayout from "@/app/layouts/HomeLayout";
import CarrierCreate from "@/app/carrier/_ui/CarrierCreate";


export default function Page() {
    return (
        <div>
            <HomeLayout>
                <CarrierCreate/>
            </HomeLayout>

        </div>
    );
};