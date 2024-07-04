import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

interface UpdateData {
    id: string;
    [key: string]: any;
}

interface WebSocketEvent {
    operation: 'invalidate' | 'update';
    entity: string | string[];
    id?: string | number;
    payload?: Record<string, any>;
}

interface ISubscription {
    query: string;
    tracking: string;
}
export const useReactQuerySubscription =  ({ query, tracking }: ISubscription) => {
    const queryClient = useQueryClient();
    const socket = useRef<Socket>();
    useEffect(() => {
        socket.current = io('http://localhost:5000/');
        socket.current.on('connect', () => {
            console.log('connect');
        });
        const handleEvent =  (data: WebSocketEvent) => {
            console.log('received event', data);
            const queryKeys = Array.isArray(data.entity) ? data.entity : [data.entity];
            console.log(data.entity)
            console.log(data.operation)

            if (data.operation === 'invalidate') {
                console.log('обновление кеша');
                queryKeys.forEach(key => {
                  queryClient.invalidateQueries({queryKey:[key]})
                })
            } else if (data.operation === 'update') {
                queryKeys.forEach(key =>{
                    queryClient.setQueriesData<UpdateData[] | UpdateData | undefined>({ queryKey: [key] }, (oldData) => {
                        const update = (entity: UpdateData) => entity.id === data.id ? { ...entity, ...data.payload } : entity;
                        return Array.isArray(oldData) ? oldData.map(update) : update(oldData as UpdateData);
                    });
                })
            }
        };
        socket.current.on(tracking, handleEvent);
        return () => {
            if (socket.current) {
                socket.current.off(tracking, handleEvent);
                socket.current.disconnect();
            }
        };
    }, [queryClient, tracking]);

    const send = (input: WebSocketEvent) => {
        console.log('Sending event:', query, input);
        socket.current?.emit(query, input);
    };

    return send;
};
