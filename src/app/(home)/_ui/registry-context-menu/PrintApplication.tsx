'use client';

import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import React from 'react';
import { useContextMenu } from '@/zustand/useContextMenu';
import { useQuery } from '@tanstack/react-query';

import ReactPdf from "@/components/ReactPdf";
import {QueryRegistry} from "@/app/api/query/query-registry";
export default function PrintApplication() {
  const { id } = useContextMenu();
  const { data, isPending } = useQuery({
    queryKey: ['get-id-registry'],
    queryFn: () => QueryRegistry.getId(id),
  });
  return (
    <div>
      {data && (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
          <ReactPdf data={data} />
        </PDFViewer>
      )}
      {/*<PDFDownloadLink*/}
      {/*  document={<ReactPdf data={data} />}*/}
      {/*  fileName={`${data?.application.applicationNumber}.pdf`}*/}
      {/*>*/}
      {/*  {({ blob, url, loading, error }) =>*/}
      {/*    loading ? 'Загрузка документа...' : 'Скачать документ'*/}
      {/*  }*/}
      {/*</PDFDownloadLink>*/}
    </div>
  );
}
