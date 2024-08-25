import HomeLayout from "@/app/layouts/HomeLayout";
import ProfileUsers from "@/app/profile/_ui/ProfileUsers";
import ProfileTop from "@/app/profile/_ui/ProfileTop";

export default function Page() {
    return (
        <div>
            <HomeLayout scroll={false}>
                <ProfileTop/>
                <ProfileUsers/>
            </HomeLayout>
        </div>
    );
};