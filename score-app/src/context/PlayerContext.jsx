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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getNewIdPlayer = () => {
    let newId = `p${players.length + 1}`;
    while (players.find((player) => player.id === newId)) {
      newId = `p${parseInt(newId.slice(1)) + 1}`;
    }
    return newId;
  };

  const getNewIdTeam = () => {
    let newId = `t${teams.length + 1}`;
    while (teams.find((team) => team.id === newId)) {
      newId = `t${parseInt(newId.slice(1)) + 1}`;
    }
    return newId;
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
    if (bool) {
      setIsTeamMode(true);
      if (teams.length === 0) {
        const initialTeams = [
          { id: "t1", teamName: "Équipe 1" },
          { id: "t2", teamName: "Équipe 2" },
        ];
        setTeams(initialTeams);
        saveTeams(initialTeams);
      }
      const updatedPlayers = players.map((player, index) => {
        return { ...player, team: `t${(index % 2) + 1}` };
      });
      setPlayers(updatedPlayers);
      savePlayers(updatedPlayers);
    } else {
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
      const newId = getNewIdPlayer();
      const newPlayer = { id: newId, name: playerName, score: 0 };
      if (isTeamMode) {
        newPlayer.team = "t1";
      }
      const updatedPlayers = [...players, newPlayer];
      setPlayers(updatedPlayers);
      savePlayers(updatedPlayers);
    }
  };

  const addTeam = () => {
    const newId = getNewIdTeam();
    const newTeam = { id: newId, teamName: `Équipe ${newId}` };
    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    saveTeams(updatedTeams);
  };

  const editPlayer = (id, newName) => {
    if (newName.trim()) {
      newName = capitalizeFirstLetter(newName);
      const updatedPlayers = players.map((player) =>
        player.id === id ? { ...player, name: newName } : player
      );
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

  const getPlayersInfos = (id) => {
    return players.find((player) => player.id === id);
  };

  const removePlayer = (id) => {
    const updatedPlayers = players.filter((player) => player.id !== id);
    setPlayers(updatedPlayers);
    savePlayers(updatedPlayers);
  };

  const addPoints = (id, points) => {
    const updatedPlayers = players.map((player) =>
      player.id === id ? { ...player, score: player.score + points } : player
    );
    setPlayers(updatedPlayers);
    savePlayers(updatedPlayers);
  };

  const removePoints = (id, points) => {
    const updatedPlayers = players.map((player) =>
      player.id === id ? { ...player, score: player.score - points } : player
    );
    setPlayers(updatedPlayers);
    savePlayers(updatedPlayers);
  };

  const movePlayer = (id, team) => {
    const updatedPlayers = players.map((player) =>
      player.id === id ? { ...player, team: team } : player
    );
    setPlayers(updatedPlayers);
    savePlayers(updatedPlayers);
  };

  const resetScores = () => {
    const updatedPlayers = players.map((player) => {
      return { ...player, score: 0 };
    });
    setPlayers(updatedPlayers);
    savePlayers(updatedPlayers);
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
