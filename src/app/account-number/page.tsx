import HomeLayout from "@/app/layouts/HomeLayout";
import AccountNumber from "@/app/account-number/_ui/AccountNumber";

export default function Page() {
    return (
        <div>
            <HomeLayout>
                <AccountNumber/>
            </HomeLayout>
        </div>
    );
};