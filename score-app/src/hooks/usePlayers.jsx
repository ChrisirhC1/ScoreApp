import { useState, useEffect } from 'react';

const usePlayers = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const storedPlayers = localStorage.getItem('players');
        if (storedPlayers) {
            setPlayers(JSON.parse(storedPlayers));
        }
    }, []);

    // Ajouter un joueur
    const addPlayer = (playerName) => {
        if (playerName.trim()) {
            const updatedPlayers = [...players, { [playerName]: 0 }];
            setPlayers(updatedPlayers);
        }
    };

    // Modifier un joueur
    const editPlayer = (index, newName) => {
        if (newName.trim()) {
            const updatedPlayers = [...players];
            const score = Object.values(updatedPlayers[index])[0];
            updatedPlayers[index] = { [newName]: score };
            setPlayers(updatedPlayers);
        }
    };

    // Supprimer un joueur
    const removePlayer = (index) => {
        const updatedPlayers = players.filter((_, i) => i !== index);
        setPlayers(updatedPlayers);
    };

    // Réinitialiser les scores à zéro
    const resetScores = () => {
        const updatedPlayers = players.map((player) => {
            const playerName = Object.keys(player)[0];
            return { [playerName]: 0 };
        });
        setPlayers(updatedPlayers);
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
    };

    // Sauvegarde des joueurs dans le localStorage
    const savePlayers = () => {
        localStorage.setItem('players', JSON.stringify(players));
    };

    // Supprimer tous les joueurs
    const clearPlayers = () => {
        setPlayers([]);
        localStorage.removeItem('players');
    };




    /* MODIFICATIONS DES POINTS */


    // Ajouter des points à un joueur
    const addPoints = (index, points) => {
        const updatedPlayers = [...players];
        const playerName = Object.keys(updatedPlayers[index])[0];
        const score = Object.values(updatedPlayers[index])[0];
        updatedPlayers[index] = { [playerName]: score + points };
        setPlayers(updatedPlayers);
    };

    // Retirer des points à un joueur
    const removePoints = (index, points) => {
        const updatedPlayers = [...players];
        const playerName = Object.keys(updatedPlayers[index])[0];
        const score = Object.values(updatedPlayers[index])[0];
        updatedPlayers[index] = { [playerName]: score - points };
        setPlayers(updatedPlayers);
    };

    return {
        players,
        addPlayer,
        editPlayer,
        removePlayer,
        resetScores,
        savePlayers,
        clearPlayers,
        addPoints,
        removePoints,
    };
};

export default usePlayers;
