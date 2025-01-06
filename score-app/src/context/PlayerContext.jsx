// context/PlayerContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const storedPlayers = localStorage.getItem('players');
        if (storedPlayers) {
            setPlayers(JSON.parse(storedPlayers));
        }
    }, []);

    const addPlayer = (playerName) => {
        if (playerName.trim()) {
            const updatedPlayers = [...players, { [playerName]: 0 }];
            setPlayers(updatedPlayers);
            localStorage.setItem('players', JSON.stringify(updatedPlayers));
        }
    };

    const editPlayer = (index, newName) => {
        if (newName.trim()) {
            const updatedPlayers = [...players];
            const score = Object.values(updatedPlayers[index])[0];
            updatedPlayers[index] = { [newName]: score };
            setPlayers(updatedPlayers);
            localStorage.setItem('players', JSON.stringify(updatedPlayers));
        }
    };

    const getPlayers = () => {
        return players;
    }

    const removePlayer = (index) => {
        const updatedPlayers = players.filter((_, i) => i !== index);
        setPlayers(updatedPlayers);
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
        if (updatedPlayers.length === 0) {
            localStorage.removeItem('players');
        }
    };

    const resetScores = () => {
        const updatedPlayers = players.map(player => {
            const playerName = Object.keys(player)[0];
            return { [playerName]: 0 };
        });
        if (updatedPlayers.length === 0) {
            localStorage.removeItem('players');
        } else {
            setPlayers(updatedPlayers);
            localStorage.setItem('players', JSON.stringify(updatedPlayers));
        }
    };

    const clearPlayers = () => {
        localStorage.removeItem('players');
        setPlayers([]);
    };

    return (
        <PlayerContext.Provider value={{ players, addPlayer, editPlayer, getPlayers, removePlayer, resetScores, clearPlayers }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayers = () => useContext(PlayerContext);
