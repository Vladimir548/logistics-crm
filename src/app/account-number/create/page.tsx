import HomeLayout from "@/app/layouts/HomeLayout";
import AccountNumberCreate from "@/app/account-number/_ui/AccountNumberCreate";

export default function Page() {
    return (
        <div>
            <HomeLayout>
                <AccountNumberCreate/>
            </HomeLayout>

        </div>
    );
};