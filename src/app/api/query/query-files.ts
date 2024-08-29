import {axiosData, instance} from "@/app/api/axios";

import {IFile} from "@/interface/interface-file";


export const QueryFiles = {
    async uploadFileRegistry(file: File,id:number){
        const formData = new FormData();
        formData.append("file", file);

        const {data} = await  axiosData.post(`/files/registry/upload/${id}`,formData);
        return data as any
    },
    async getFilesRegistry(id:number) {
        const { data } = await instance.get<IFile[]>(`/files/registry/${id}`)
        return data as IFile[]
    },
    async deleteFilesRegistry(id:number) {
        const { data } = await instance.post<IFile[]>(`/files/registry/delete/${id}`)
        return data as IFile[]
    }
}