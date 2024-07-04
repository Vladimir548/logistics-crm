'use client';

import HomeLayout from '@/app/layouts/HomeLayout';
import ApplicationCreate from "@/app/application/_ui/ApplicationCreate";
import AgreementCreate from "@/app/agreement/_ui/AgreementCreate";
import InvoiceCreate from "@/app/invoice/_ui/InvoiceCreate";

import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import {ReactElement} from "react";
interface ITabData {
  label:string
  value:string
  component:ReactElement
}
export default function RegistryCreate() {

  const TabData:ITabData[] = [
    {
      label:'Заявка',
      value:'application',
      component:<ApplicationCreate/>
    }, {
      label:'Договор',
      value:'agreement',
      component:<AgreementCreate/>
    },{
      label:'УПД',
      value:'invoice',
      component:<InvoiceCreate/>
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
              <Card className={'bg-transparent w-full h-full shadow shadow-cyan-600'}>
                <CardBody className={'bg-transparent p-0 w-full h-full'}>
                  {tab.component}
                </CardBody>
              </Card>
            </Tab>
        ))}


      </Tabs>


  );
}
