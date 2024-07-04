import HomeLayout from "@/app/layouts/HomeLayout";
import ApplicationCreate from "@/app/application/_ui/ApplicationCreate";

export default function Page() {
    return (
        <div>
            <HomeLayout>
                <ApplicationCreate/>
            </HomeLayout>

        </div>
    );
};