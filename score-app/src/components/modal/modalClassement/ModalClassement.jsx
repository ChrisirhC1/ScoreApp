import { Button, Modal, Table, Form } from "react-bootstrap";
import { usePlayers } from "../../../context/PlayerContext";
import { useState, useMemo } from "react";

const ModalClassement = ({ show, setShow }) => {
  const { players, teams, isTeamMode } = usePlayers();
  const [showByTeam, setShowByTeam] = useState(false);

  const { sortedPlayers, rankedTeams } = useMemo(() => {
    const grouped = {};
    players.forEach((player) => {
      if (!grouped[player.team]) {
        grouped[player.team] = { members: [], totalScore: 0 };
      }
      grouped[player.team].members.push(player);
      grouped[player.team].totalScore += player.score;
    });

    const rankedTeams = Object.entries(grouped)
      .map(([teamId, data]) => {
        const teamInfo = teams.find((t) => t.id === teamId);
        return { teamId, teamName: teamInfo?.teamName ?? teamId, ...data };
      })
      .sort((a, b) => b.totalScore - a.totalScore);

    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    return { sortedPlayers, rankedTeams };
  }, [players, teams]);

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Classement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {players.length === 0 ? (
          <p>Aucun joueur n&apos;a été ajouté</p>
        ) : (
          <>
            <Form.Check
              type="switch"
              id="switch-mode"
              label="Classement par équipe"
              checked={isTeamMode && showByTeam}
              onChange={() => setShowByTeam(!showByTeam)}
              disabled={!isTeamMode}
            />

            {showByTeam && isTeamMode ? (
              rankedTeams.map((team) => (
                <Table striped bordered hover key={team.teamId}>
                  <thead>
                    <tr>
                      <th>{team.teamName}</th>
                      <th>Score total : {team.totalScore}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.members.map((player) => (
                      <tr key={player.id}>
                        <td>{player.name}</td>
                        <td>{player.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ))
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Joueur</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPlayers.map((player, index) => (
                    <tr key={player.id}>
                      <td>{index + 1}</td>
                      <td>{player.name}</td>
                      <td>{player.score}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalClassement;
