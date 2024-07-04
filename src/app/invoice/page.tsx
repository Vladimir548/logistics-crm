import HomeLayout from "@/app/layouts/HomeLayout";
import Invoice from "@/app/invoice/_ui/Invoice";

export default function Page() {
    return (
        <div>
            <HomeLayout>
                <Invoice/>
            </HomeLayout>
        </div>
    );
};