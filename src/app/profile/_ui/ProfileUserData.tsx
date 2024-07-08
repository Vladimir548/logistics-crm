'use client'

import {Card, CardBody, Tab, Tabs} from "@nextui-org/react";
import {ReactElement} from "react";
import UserApplication from "@/app/profile/_ui/tabs-data/UserApplication";
import UserAgreement from "@/app/profile/_ui/tabs-data/UserAgreement";
import UserInvoice from "@/app/profile/_ui/tabs-data/UserInvoice";
import {ScrollArea, ScrollBar} from "@/components/scroll-area/ScrollArea";
interface ITabData {
    label:string
    value:string
    component:ReactElement
}

export default function ProfileUserData({id}:{id:string}) {
    const TabData:ITabData[] = [
        {
            label:'Заявки',
            value:'application',
            component:<UserApplication id={id}/>
        }, {
            label:'Договора',
            value:'agreement',
            component:<UserAgreement id={id}/>
        },{
            label:'УПД',
            value:'invoice',
            component:<UserInvoice id={id}/>
        },

    ]

    return (
            <Tabs variant={'underlined'} classNames={{
                cursor:'bg-text',
                tab:'bg-transparent',
                tabContent: "text-text-dark group-data-[selected=true]:text-text ",
            }} aria-label="create">
                {TabData.map(tab => (
                    <Tab className={'text-text bg-transparent '} key={tab.value} title={tab.label}>
                        <Card className={'bg-transparent w-full h-full  relative shadow shadow-cyan-600'}>
                                <ScrollArea className={' w-full h-full  '}>
                            <CardBody className={'bg-transparent p-0 w-full h-full'}>
                                    {tab.component}
                            </CardBody>
                                    <ScrollBar  orientation={'horizontal'}/>
                                </ScrollArea>
                        </Card>
                    </Tab>
                ))}
            </Tabs>
    );
};