import HomeLayout from "@/app/layouts/HomeLayout";
import Profile from "@/app/profile/_ui/Profile";

export default function Page() {
    return (
            <HomeLayout scroll={false} >
                <Profile/>
            </HomeLayout>
    )
};