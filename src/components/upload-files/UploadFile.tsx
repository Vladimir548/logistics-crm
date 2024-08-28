import {useState, useCallback} from "react";
import {useDropzone} from 'react-dropzone';
import axios from "axios";
import {MdDriveFolderUpload} from "react-icons/md";
import {IoCloseCircleOutline} from "react-icons/io5";
import {IoIosCheckmarkCircleOutline} from "react-icons/io";
import {Button} from "@/components/buttons/Buttons";
import Loading from "@/components/loading/Loading";
import toast from "react-hot-toast";
import {ScrollArea} from "@/components/scroll-area/ScrollArea";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";


export default function UploadFile({id}: { id: number }) {
    const [selectedFile, setSelectedFile] = useState<File[]>([]);
    const [progress, setProgress] = useState<Record<string, number>>({});
    const [uploadStatus, setUploadStatus] = useState<Record<string, "select" | "uploading" | "done" | "error">>({});
    const send = useReactQuerySubscription({query:'update-document', tracking:'document'})
    const onDrop = useCallback((acceptedFiles: File[]) => {
        for(const newFile of acceptedFiles) {
            if (selectedFile.some(val => val.name === newFile.name)){
              return   toast.error(<div className={'flex flex-col'}>
                    <h3 className={'leading-5 font-bold'}>{newFile.name}</h3>
                    <span>Файл уже в списке</span>
                </div>)
            }
        }
        setSelectedFile((prevState => [...prevState, ...acceptedFiles]))
        acceptedFiles.forEach(file => {
            setUploadStatus(prevState => ({
                ...prevState, [file.name]: 'select',
            }))
            setProgress(prevState => ({
                ...prevState, [file.name]: 0
            }))
        })
    }, [selectedFile]);
    const {getRootProps, getInputProps,} = useDropzone({
        onDrop,
        multiple: true,
        accept: {
            'image/*': [], '': [],
            'application/pdf': [],
            'application/msword': [],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
        },
        disabled: Object.values(uploadStatus).includes("uploading"),
        maxSize: 52428800,
        onDropRejected: (fileRejections) => {
            fileRejections.forEach(err => {
                toast.error(
                    <div className={'flex flex-col'}>
                        <h3 className={'leading-5 font-bold'}>{err.file.name}</h3>
                        <span>{err.errors.map(e => e.code === 'file-too-large' && 'Размер файла превышает 50 Мб')}</span>
                    </div>
                );
            });
        },
    });
    const handleUpload = async () => {
        for (const file of selectedFile) {
            if (uploadStatus[file.name] === 'done') {
                setSelectedFile(files => files.filter(val => val.name !== file.name))
            }
            if (uploadStatus[file.name] === 'error') {
                setUploadStatus(prevState => ({
                    ...prevState, [file.name]: 'uploading'
                }))
                setProgress(prevState => ({
                    ...prevState, [file.name]: 0
                }))
            }
            if (uploadStatus[file.name] !== "select" && uploadStatus[file.name] !== "error") continue

            setUploadStatus(prevState => ({
                ...prevState, [file.name]: 'uploading'
            }))
            const formData = new FormData();
            formData.append("file", file);
            try {
                await axios.post(
                    `http://localhost:5000/api/registry/upload/${id}`,
                    formData,
                    {
                        onUploadProgress: (progressEvent) => {
                            if (progressEvent.total) {
                                const percentCompleted = Math.round(
                                    (progressEvent.loaded * 100) / progressEvent.total
                                );
                                setProgress(prevState => ({
                                    ...prevState, [file.name]: percentCompleted
                                }));
                            }
                        },
                    }
                );
                setUploadStatus(prevStatus => ({
                    ...prevStatus,
                    [file.name]: "done"
                }));
                send({operation:'invalidate',entity:'get-files',id:id})
            } catch (error) {
                toast.error('Произошла ошибка при добавление файла')
                setUploadStatus(prevStatus => ({
                    ...prevStatus,
                    [file.name]: "error"
                }));
            }

        }
    };

    const clearFileInput = (fileName?: string) => {
        if (fileName) {
            setSelectedFile(files => files.filter(val => val.name !== fileName));
            setProgress(prevProgress => {
                const {[fileName]: _, ...rest} = prevProgress;
                return rest;
            });
            setUploadStatus(prevStatus => {
                const {[fileName]: _, ...rest} = prevStatus;
                return rest;
            });
        } else {
            setSelectedFile([]);
            setProgress({});
            setUploadStatus({});
        }
    };
    return (
        <div className={'flex flex-col w-full'}>
            <div
                {...getRootProps({
                    className: `relative p-3 w-full bg-text/20 h-[170px] ${Object.values(uploadStatus).includes("uploading") && 'disabled:bg-text-10 disabled:pointer-events-none'}  group cursor-pointer easy-in-out duration-300 rounded-md border border-text-dark border-dashed hover:border-text`,
                })}
            >
                <input {...getInputProps()} />
                {!Object.values(uploadStatus).includes("uploading") ? (
                    <div
                        className={'flex flex-col w-full h-full text-text-dark easy-in-out duration-300 group-hover:text-text'}>
                    <span className={'flex justify-center items-center h-full'}>
                        <MdDriveFolderUpload size={58}/>
                    </span>
                        <p className={'w-full h-full flex justify-center items-end text-2xl font-bold'}>
                            Перенесите файлы сюда, или нажмите и выберите файлы
                        </p>
                    </div>
                ) : (
                    <div
                        className={'flex flex-col w-full h-full text-text easy-in-out duration-300 '}>
                    <span className={'flex justify-center items-center h-full'}>
                        <Loading size={58}/>
                    </span>
                        <p className={'w-full h-full flex justify-center items-end text-2xl font-bold'}>
                            Дождитесь окончания загрузки
                        </p>
                    </div>
                )}
            </div>

            <div className={'w-full  flex flex-col bg-text/10 rounded-b-md p-2 '}>
                <ScrollArea className={'h-[150px] flex flex-col gap-y-2'}>
                    <div className={'flex flex-col gap-y-2 pr-3'}>
                {selectedFile.length > 0 ? (
                    <>
                        {selectedFile.map(file => (
                            <div key={file.name} className="flex bg-text/10 rounded-sm p-2  ">
                                <div style={{flex: 1}}>
                                    <h4 className={`line-clamp-1 ${uploadStatus[file.name] === 'error' ? 'text-red-500' : uploadStatus[file.name] === 'done' ? 'text-green-500' : 'text-text'}`}>
                                        {file.name}
                                    </h4>
                                    <div className="w-full h-[5px] bg-text-dark/60 rounded-lg mt-2">
                                        <div
                                            className={`w-0 h-[5px] ${uploadStatus[file.name] === 'error' ? 'bg-red-500' : uploadStatus[file.name] === 'done' ? 'bg-green-500' : 'bg-text'} rounded-lg transition-all duration-500 ease-in-out`}
                                            style={{width: `${progress[file.name] || 0}%`}}
                                        />
                                    </div>
                                </div>
                                {uploadStatus[file.name] === "select" || uploadStatus[file.name] === "error" ? (
                                    <Button variant={'no-style'} className={'w-[60px] flex justify-center items-center'}
                                            onClick={() => clearFileInput(file.name)}>
                                    <span
                                        className={`${uploadStatus[file.name] === 'error' ? 'text-red-500 hover:text-red-600' : 'text-text-dark hover:text-text'} duration-300 easy-in-out`}>
                                        <IoCloseCircleOutline size={28}/>
                                    </span>
                                    </Button>
                                ) : (
                                    <div className={'w-[60px] text-text flex justify-center items-center'}>
                                        {uploadStatus[file.name] === "uploading" ? (
                                            `${progress[file.name]}%`
                                        ) : uploadStatus[file.name] === "done" ? (
                                            <span className={'text-green-500'}>
                                            <IoIosCheckmarkCircleOutline size={28}/>
                                        </span>
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        ))}

                        <Button
                            variant={Object.values(uploadStatus).some(status => status === "error") ? 'delete' : Object.values(uploadStatus).every(status => status === "done") ? 'add' : 'upload'}
                            className={'py-3'}
                            disabled={Object.values(uploadStatus).includes("uploading")} onClick={handleUpload}>
                            {Object.values(uploadStatus).every(status => status === "select") ? "Загрузить" :
                                Object.values(uploadStatus).includes("uploading") ? "Загрузка..." :
                                    Object.values(uploadStatus).some(status => status === "error") ? 'Попробовать снова' : "Продолжить"}
                        </Button>
                    </>
                ) : (
                    <span className={'flex justify-center items-center w-full h-full text-text text-2xl'}>Выбранные файлы</span>
                )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
