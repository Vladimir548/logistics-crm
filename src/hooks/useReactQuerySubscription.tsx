import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import {getIdUser} from "@/services/auth/auth.helper";



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
export const useReactQuerySubscription = ({ query, tracking }: ISubscription) => {
    const queryClient = useQueryClient();
    const socket = useRef<Socket>();

    useEffect(() => {
        console.count('useEffect вызван');
        const id = getIdUser();
        socket.current = io('http://localhost:5000/', {
            query: { userId: id }
        });

        socket.current.on('connect', () => {
            console.log('WebSocket connected');
        });

        const handleEvent = (data: WebSocketEvent) => {
                console.count('handle event вызван')

            const queryKeys = Array.isArray(data.entity) ? data.entity : [data.entity];

            if (data.operation === 'invalidate') {
                queryKeys.forEach(key => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                });
            } else if (data.operation === 'update') {
                queryKeys.forEach(key => {
                    queryClient.setQueriesData({ queryKey: [key] }, data.payload);
                });
            }
        };

        // Удаляем старые слушатели перед добавлением новых
        socket.current.off(tracking, handleEvent);
        socket.current.on(tracking, handleEvent);

        return () => {
            if (socket.current) {
                socket.current.off(tracking, handleEvent);
                socket.current.disconnect();
            }
        };
    }, [queryClient, tracking]);

    const send = (input: WebSocketEvent) => {
        socket.current?.emit(query, input);
    };

    return send;
};
