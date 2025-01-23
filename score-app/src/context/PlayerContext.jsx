// context/PlayerContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);
    const [isNegativeScore, setIsNegativeScore] = useState(false);

    useEffect(() => {
        const storedPlayers = localStorage.getItem('players');
        if (storedPlayers) {
            setPlayers(JSON.parse(storedPlayers));
        }
    }, []);

    // méthodes pour mettre une majuscule sur la premiere lettre du nom
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const allowNegativeScores = (bool) => {
        setIsNegativeScore(bool);
    }

    const getAllowNegativeScores = () => {
        return isNegativeScore;
    }


    const addPlayer = (playerName) => {
        if (playerName.trim()) {
            playerName = capitalizeFirstLetter(playerName);
            const updatedPlayers = [...players, { name: playerName, score: 0 }];
            setPlayers(updatedPlayers);
            localStorage.setItem('players', JSON.stringify(updatedPlayers));
        }
    };
    

    const editPlayer = (index, newName) => {
        if (newName.trim()) {
            newName = capitalizeFirstLetter(newName);
            const updatedPlayers = [...players];
            updatedPlayers[index] = {
                ...updatedPlayers[index], 
                name: newName 
            };
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

    const addPoints = (index, points) => {
        const updatedPlayers = [...players];
        updatedPlayers[index].score += points;
        setPlayers(updatedPlayers);
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
    };
    
    const removePoints = (index, points) => {
        const updatedPlayers = [...players];
        updatedPlayers[index].score -= points;
        setPlayers(updatedPlayers);
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
    };
    

    const resetScores = () => {
        const updatedPlayers = players.map(player => {
            return { name: player.name, score: 0 };
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
        <PlayerContext.Provider value={{ players, allowNegativeScores, getAllowNegativeScores, addPlayer, editPlayer, getPlayers, removePlayer, addPoints, removePoints, resetScores, clearPlayers }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayers = () => useContext(PlayerContext);
