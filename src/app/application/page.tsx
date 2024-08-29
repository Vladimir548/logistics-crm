import Application from "@/app/application/_ui/Application";
import HomeLayout from "@/app/layouts/HomeLayout";
import {Suspense} from "react";

export default function Page() {
    return (
<Suspense fallback={null}>
            <HomeLayout scroll={false}>
                <Application/>
            </HomeLayout>
</Suspense>
    );
};