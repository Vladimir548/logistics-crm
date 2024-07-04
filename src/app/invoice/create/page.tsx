import HomeLayout from "@/app/layouts/HomeLayout";
import InvoiceCreate from "@/app/invoice/_ui/InvoiceCreate";

export default function Page() {
    return (
        <div>
            <HomeLayout>
                <InvoiceCreate/>
            </HomeLayout>

        </div>
    );
};