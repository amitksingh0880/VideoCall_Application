import { useUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { error } from "console";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketUser {
    userId: string;
    socketId: string;
    profile: User
}

interface iSocketContext {
       onlineUsers: SocketUser[] | null
}
export const SocketContext = createContext<iSocketContext | null>(null)

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {

    const { user } = useUser();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [onlineUsers , setOnlineUsers] = useState<SocketUser[] | null>(null);

    // console.log("IsSocketConnect:>>>", isSocketConnected);
    console.log("OnlineUsers>>>", onlineUsers);
    

    //Initializing the Socket
    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket);
        return () => {
            newSocket.disconnect()
        }
    }, [user]);

    useEffect(() => {
        if (socket === null) return;
        if (socket.connected) {
            onConnect();
        }
        function onConnect() {
            setIsSocketConnected(true);
        }
        function onDisconnect() {
            setIsSocketConnected(false);
        }
        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
        }
    }, [socket])

    //Set Online Users
    useEffect(()=>{
        if(!socket || !isSocketConnected) return;

        socket.emit('addNewUser', user);
        socket.on('getUsers',(res)=>{
            setOnlineUsers(res)
        })

     return ()=>{
        socket.off('getUsers',(res)=>{
            setOnlineUsers(res)
        })
     }
    },[socket, isSocketConnected , user])

    return <SocketContext.Provider value={{onlineUsers}}>
        {children}
    </SocketContext.Provider>
}

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (context === null) {
        throw new Error("useSocket must be used inside within the socketContextProvider")
    }
    return context
}

