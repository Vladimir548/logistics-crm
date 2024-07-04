'use client';

import {Card, CardBody, Tab, Tabs} from "@nextui-org/react";
import {ReactElement} from "react";
import ApplicationEditing from "@/app/application/_ui/ApplicationEditing";
import AgreementEditing from "@/app/agreement/_ui/AgreementEditing";
import InvoiceEditing from "@/app/invoice/_ui/InvoiceEditing";

interface ITabData {
  label:string
  value:string
  component:ReactElement
}
export default function RegistryEditing() {
  const TabData:ITabData[] = [
    {
      label:'Заявка',
      value:'application',
      component:<ApplicationEditing/>
    }, {
      label:'Договор',
      value:'agreement',
      component:<AgreementEditing/>
    },{
      label:'УПД',
      value:'invoice',
      component:<InvoiceEditing/>
    },

  ]
  return (
    <div>
      <Tabs variant={'underlined'} classNames={{
        cursor:'bg-text',
        tab:'bg-transparent',
        tabContent: "text-text-dark group-data-[selected=true]:text-text ",

      }} aria-label="create">
        {TabData.map(tab => (
            <Tab className={'text-text bg-transparent '} key={tab.value} title={tab.label}>
              <Card className={'bg-transparent w-full h-full shadow shadow-cyan-600'}>
                <CardBody className={'bg-transparent p-0 w-full h-full'}>
                  {tab.component}
                </CardBody>
              </Card>
            </Tab>
        ))}
      </Tabs>
    </div>
  );
}
