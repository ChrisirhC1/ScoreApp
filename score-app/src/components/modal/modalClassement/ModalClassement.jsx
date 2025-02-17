import { Button, Modal, Table, Form } from "react-bootstrap";
import { usePlayers } from "../../../context/PlayerContext";
import { useState } from "react";

const ModalClassement = ({ show, setShow }) => {
  const { getPlayers, getTeamMode } = usePlayers();
  const [teamMode, setTeamMode] = useState(false); // État pour afficher par équipe ou solo

  const players = getPlayers();

  // Regrouper les joueurs par équipe et calculer le score total
  const teams = {};
  players.forEach((player) => {
    if (!teams[player.team]) {
      teams[player.team] = { members: [], totalScore: 0 };
    }
    teams[player.team].members.push(player);
    teams[player.team].totalScore += player.score;
  });

  // Trier les équipes par score total
  const sortedTeams = Object.entries(teams)
    .map(([team, data]) => ({ team, ...data }))
    .sort((a, b) => b.totalScore - a.totalScore);

  // Trier les joueurs par score individuel
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Classement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {players.length === 0 ? (
          <p>Aucun joueur n'a été ajouté</p>
        ) : (
          <>
            {/* Switch entre classement solo et par équipe */}
            <Form.Check
              type="switch"
              id="switch-mode"
              label="Classement par équipe"
              checked={getTeamMode() && teamMode}
              onChange={() => setTeamMode(!teamMode)}
              disabled={!getTeamMode()}
            />

            {/* Tableau des scores Solo */}
            {teamMode ? (
              <>
                {sortedTeams.map((team, index) => (
                  <Table striped bordered hover key={team.team}>
                    <thead>
                      <tr>
                        <th>Équipe {team.team[1]} </th>
                        <th>Score {team.totalScore}</th>
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
                ))}
              </>
            ) : (
              <>
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
              </>
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
