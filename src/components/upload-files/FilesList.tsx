import {useQuery} from "@tanstack/react-query";
import {QueryRegistry} from "@/app/api/query/query-registry";

import FileCard from "@/components/upload-files/FileCard";



export default function FilesList({id}: { id: number }) {
    const {data} = useQuery({
        queryKey: ['get-files'],
        queryFn: () => QueryRegistry.getFiles(id)
    })

    return (
        <>
            <h3 className={'text-text py-2 text-xl'}>Сохраненные файлы</h3>
            <ul className={'flex  items-center gap-2 flex-wrap '}>
                {data?.map(dataFiles => (
                    dataFiles.files.map(file => (
                        <FileCard file={file} key={file.filename}/>
                    ))
                ))}
            </ul>
        </>
    );
};