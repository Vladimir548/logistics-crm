import HomeLayout from "@/app/layouts/HomeLayout";
import CostumerCreate from "@/app/costumer/_ui/CostumerCreate";

export default function Page() {
    return (
        <div>
            <HomeLayout>
                <CostumerCreate/>
            </HomeLayout>

        </div>
    );
};