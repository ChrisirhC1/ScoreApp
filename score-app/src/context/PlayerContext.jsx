// context/PlayerContext.js
import { createContext, useContext, useState, useEffect } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isTeamMode, setIsTeamMode] = useState(false);
  const [isNegativeScore, setIsNegativeScore] = useState(false);

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players");
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }
    const storedTeams = localStorage.getItem("teams");
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
      setIsTeamMode(true);
    }
  }, []);

  // méthodes pour mettre une majuscule sur la premiere lettre du nom
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const allowNegativeScores = (bool) => {
    setIsNegativeScore(bool);
  };

  const getAllowNegativeScores = () => {
    return isNegativeScore;
  };

  const savePlayers = (players) => {
    if (!players || players.length === 0) {
      localStorage.removeItem("players");
      setPlayers([]);
    } else {
      localStorage.setItem("players", JSON.stringify(players));
      setPlayers(players);
    }
  };

  const saveTeams = (teams) => {
    if (!teams || teams.length === 0) {
      localStorage.removeItem("teams");
      setPlayers([]);
    } else {
      localStorage.setItem("teams", JSON.stringify(teams));
      setTeams(teams);
    }
  };

  const teamMode = (bool) => {
    // si le mode équipe est activé, on ajoute 2 équipes par défaut et on repartit les joueurs dans ces équipes
    if (bool) {
      setIsTeamMode(true);
      if (teams.length === 0) {
        // Ajouter directement deux équipes
        const initialTeams = [
          { id: 1, teamName: "Équipe 1" },
          { id: 2, teamName: "Équipe 2" },
        ];
        setTeams(initialTeams);
        saveTeams(initialTeams);
      }
      const updatedPlayers = players.map((player, index) => {
        return { ...player, team: (index % 2) + 1 };
      });
      setPlayers(updatedPlayers);
      savePlayers(updatedPlayers);
    } else {
      // si le mode équipe est désactivé, on supprime les équipes et on supprime "team" des joueurs
      setIsTeamMode(false);
      setTeams([]);
      saveTeams([]);
      const updatedPlayers = players.map(({ team, ...player }) => player);

      setPlayers(updatedPlayers);
      savePlayers(updatedPlayers);
    }
  };

  const getTeamMode = () => {
    return isTeamMode;
  };

  const addPlayer = (playerName) => {
    if (playerName.trim()) {
      playerName = capitalizeFirstLetter(playerName);
      if (isTeamMode) {
        const updatedPlayers = [
          ...players,
          { name: playerName, score: 0, team: 1 },
        ];
        setPlayers(updatedPlayers);
        savePlayers(updatedPlayers);
      } else {
        const updatedPlayers = [...players, { name: playerName, score: 0 }];
        setPlayers(updatedPlayers);
        savePlayers(updatedPlayers);
      }
    }
  };

  const addTeam = () => {
    // Générer un nouvel ID basé sur la longueur de la liste existante
    const newId =
      teams.length > 0 ? Math.max(...teams.map((team) => team.id)) + 1 : 1;

    // Créer la nouvelle équipe
    const newTeam = { id: newId, teamName: `Équipe ${newId}` };

    // Ajouter la nouvelle équipe sans remplacer l'ancienne liste
    const updatedTeams = [...teams, newTeam];

    // Mettre à jour l'état
    setTeams(updatedTeams);

    // Sauvegarder la liste mise à jour
    saveTeams(updatedTeams);

    console.log(updatedTeams);
  };

  const editPlayer = (index, newName) => {
    if (newName.trim()) {
      newName = capitalizeFirstLetter(newName);
      const updatedPlayers = [...players];
      updatedPlayers[index] = {
        ...updatedPlayers[index],
        name: newName,
      };
      setPlayers(updatedPlayers);
      savePlayers(updatedPlayers);
    }
  };

  const getPlayers = () => {
    return players;
  };

  const getPlayersByTeam = (team) => {
    return players.filter((player) => player.team === team);
  };

  const getPlayersInfos = (index) => {
    return players[index];
  };

  const removePlayer = (index) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
    savePlayers(updatedPlayers);
  };

  const addPoints = (index, points) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].score += points;
    setPlayers(updatedPlayers);
    savePlayers(updatedPlayers);
  };

  const removePoints = (index, points) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].score -= points;
    setPlayers(updatedPlayers);
    savePlayers(updatedPlayers);
  };

  const movePlayer = (index, team) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].team = team;
    setPlayers(updatedPlayers);
    savePlayers(updatedPlayers);
  };

  const resetScores = () => {
    const updatedPlayers = players.map((player) => {
      return { name: player.name, score: 0 };
    });

    if (updatedPlayers.length === 0) {
      localStorage.removeItem("players");
    } else {
      setPlayers(updatedPlayers);
      savePlayers(updatedPlayers);
    }
  };

  const clearPlayers = () => {
    savePlayers([]);
    saveTeams([]);
  };

  return (
    <PlayerContext.Provider
      value={{
        players,
        teams,
        allowNegativeScores,
        getAllowNegativeScores,
        addPlayer,
        editPlayer,
        getPlayers,
        removePlayer,
        addPoints,
        removePoints,
        movePlayer,
        resetScores,
        clearPlayers,
        teamMode,
        getTeamMode,
        getPlayersByTeam,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayers = () => useContext(PlayerContext);
