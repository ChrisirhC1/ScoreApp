import { createContext, useContext, useState, useEffect } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isTeamMode, setIsTeamMode] = useState(false);
  const [isNegativeScore, setIsNegativeScore] = useState(false);

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players");
    if (storedPlayers) setPlayers(JSON.parse(storedPlayers));

    const storedTeams = localStorage.getItem("teams");
    if (storedTeams) setTeams(JSON.parse(storedTeams));

    const storedIsTeamMode = localStorage.getItem("isTeamMode");
    if (storedIsTeamMode !== null) setIsTeamMode(JSON.parse(storedIsTeamMode));

    const storedIsNegativeScore = localStorage.getItem("isNegativeScore");
    if (storedIsNegativeScore !== null) setIsNegativeScore(JSON.parse(storedIsNegativeScore));
  }, []);

  /*########## UTILITAIRES ##########*/

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const getNewId = (list, prefix) => {
    let n = list.length + 1;
    while (list.find((item) => item.id === `${prefix}${n}`)) n++;
    return `${prefix}${n}`;
  };

  const savePlayers = (updated) => {
    if (!updated || updated.length === 0) {
      localStorage.removeItem("players");
      setPlayers([]);
    } else {
      localStorage.setItem("players", JSON.stringify(updated));
      setPlayers(updated);
    }
  };

  const saveTeams = (updated) => {
    if (!updated || updated.length === 0) {
      localStorage.removeItem("teams");
      setTeams([]);
    } else {
      localStorage.setItem("teams", JSON.stringify(updated));
      setTeams(updated);
    }
  };

  /*########## SCORES ##########*/

  const allowNegativeScores = (bool) => {
    setIsNegativeScore(bool);
    localStorage.setItem("isNegativeScore", JSON.stringify(bool));
  };

  /*########## PLAYERS ##########*/

  const addPlayer = (playerName, teamId) => {
    if (!playerName.trim()) return;
    const newPlayer = {
      id: getNewId(players, "p"),
      name: capitalizeFirstLetter(playerName),
      score: 0,
      ...(isTeamMode && { team: teamId }),
    };
    savePlayers([...players, newPlayer]);
  };

  const editPlayer = (id, newName, newTeam) => {
    if (!newName.trim()) return;
    const updatedPlayers = players.map((player) =>
      player.id === id
        ? {
            ...player,
            name: capitalizeFirstLetter(newName),
            ...(newTeam !== undefined && { team: newTeam }),
          }
        : player
    );
    savePlayers(updatedPlayers);
  };

  const removePlayer = (id) =>
    savePlayers(players.filter((player) => player.id !== id));

  const getPlayersByTeam = (teamId) =>
    players.filter((player) => player.team === teamId);

  const addPoints = (id, points) =>
    savePlayers(
      players.map((player) =>
        player.id === id ? { ...player, score: player.score + points } : player
      )
    );

  const removePoints = (id, points) =>
    savePlayers(
      players.map((player) =>
        player.id === id ? { ...player, score: player.score - points } : player
      )
    );

  const resetScores = () =>
    savePlayers(players.map((player) => ({ ...player, score: 0 })));

  /*########## TEAMS ##########*/

  const addTeam = () => {
    const newId = getNewId(teams, "t");
    saveTeams([...teams, { id: newId, teamName: `Équipe ${newId.slice(1)}` }]);
  };

  const removeTeam = (id) => {
    const updatedTeams = teams.filter((team) => team.id !== id);
    const newTeamId = updatedTeams.length > 0 ? updatedTeams[0].id : null;

    saveTeams(updatedTeams);
    savePlayers(
      players.map((player) =>
        player.team === id ? { ...player, team: newTeamId } : player
      )
    );

    if (updatedTeams.length === 0) {
      setIsTeamMode(false);
      localStorage.setItem("isTeamMode", JSON.stringify(false));
    }
  };

  const movePlayer = (id, teamId) =>
    savePlayers(
      players.map((player) =>
        player.id === id ? { ...player, team: teamId } : player
      )
    );

  const teamMode = (bool) => {
    setIsTeamMode(bool);
    localStorage.setItem("isTeamMode", JSON.stringify(bool));

    if (bool) {
      const currentTeams =
        teams.length === 0
          ? [
              { id: "t1", teamName: "Équipe 1" },
              { id: "t2", teamName: "Équipe 2" },
            ]
          : teams;
      if (teams.length === 0) saveTeams(currentTeams);
      savePlayers(
        players.map((player, index) => ({
          ...player,
          team: `t${(index % currentTeams.length) + 1}`,
        }))
      );
    } else {
      saveTeams([]);
      savePlayers(players.map(({ team, ...player }) => player));
    }
  };

  const shuffleEquipes = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    savePlayers(
      shuffled.map((player, index) => ({
        ...player,
        team: `t${(index % teams.length) + 1}`,
      }))
    );
  };

  /*########## RESET ##########*/

  const clearPlayers = () => {
    savePlayers([]);
    saveTeams([]);
    setIsTeamMode(false);
    localStorage.removeItem("isTeamMode");
  };

  return (
    <PlayerContext.Provider
      value={{
        players,
        teams,
        isTeamMode,
        isNegativeScore,
        allowNegativeScores,
        addPlayer,
        editPlayer,
        removePlayer,
        addPoints,
        removePoints,
        movePlayer,
        resetScores,
        clearPlayers,
        teamMode,
        getPlayersByTeam,
        addTeam,
        removeTeam,
        shuffleEquipes,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayers = () => useContext(PlayerContext);
