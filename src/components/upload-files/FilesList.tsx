import {useQuery} from "@tanstack/react-query";

import FileCard from "@/components/upload-files/FileCard";
import {QueryFiles} from "@/app/api/query/query-files";



export default function FilesList({id}: { id: number }) {
    const {data} = useQuery({
        queryKey: ['get-files',id],
        queryFn: () => QueryFiles.getFilesRegistry(id)
    })

    return (
        <>
            <h3 className={'text-text py-2 text-xl '}>Сохраненные файлы</h3>
            <ul className={'flex flex-col w-full items-center gap-2 flex-wrap p-1 '}>
                {data?.map(file => (
                        <FileCard file={file} key={file.filename}/>
                ))}
            </ul>
        </>
    );
};