import PartySocket from 'partysocket';
import usePartySocket from 'partysocket/react';
import { createContext, ReactNode, useContext, useEffect } from 'react';

const GameConnection = createContext<PartySocket | null>(null);

export const useGameConnection = () => useContext(GameConnection);

export const GameConnectionProvider = (
    { roomId, userId, children }:
    { roomId: string, userId: string, children: ReactNode }
) => {
    const newSocket = usePartySocket({
        room: roomId,
        id: userId
    })

    useEffect(() => {
        return () => {
            newSocket.close();
        };
    }, [])
    
    return (
        <GameConnection.Provider value={newSocket}>
            {children}
        </GameConnection.Provider>
    )
}