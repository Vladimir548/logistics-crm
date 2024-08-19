import Application from "@/app/application/_ui/Application";
import HomeLayout from "@/app/layouts/HomeLayout";

export default function Page() {
    return (

            <HomeLayout scroll={false}>
                <Application/>
            </HomeLayout>

    );
};