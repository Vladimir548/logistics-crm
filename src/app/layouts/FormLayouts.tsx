import Sidebar from "@/components/sidebar/Sidebar";

export default function FormLayouts({children}:{children:React.ReactNode}) {
    return (
        <div className={'w-full h-full flex gap-x-2 '}>
            <div className="w-[300px] h-screen rounded-md overflow-y-auto" >
                <Sidebar/>
            </div>
            <div className="bg-secondary-cust   w-full h-screen p-2  rounded-md">
                {children}
            </div>
        </div>
    );
};