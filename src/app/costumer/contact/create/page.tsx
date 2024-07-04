import HomeLayout from "@/app/layouts/HomeLayout";
import CostumerContactCreate from "@/app/costumer/contact/_ui/CostumerContactCreate";

export default function Page() {
    return (
        <div>
            <HomeLayout>
                <CostumerContactCreate/>
            </HomeLayout>
        </div>
    );
};