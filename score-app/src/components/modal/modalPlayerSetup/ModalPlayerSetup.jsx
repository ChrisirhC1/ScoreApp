import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { usePlayers } from "../../../context/PlayerContext";
import FormSetupSolo from "./FormSetupSolo";
import FormSetupEquipe from "./FormSetupEquipe";

const ModalPlayerSetup = ({ show, setShow }) => {
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [currentTeam, setCurrentTeam] = useState("t1");
  const [isEditing, setIsEditing] = useState(null);

  const { players, teams, isTeamMode, addPlayer, editPlayer, removePlayer, teamMode } = usePlayers();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing !== null) {
      editPlayer(isEditing, currentPlayer, currentTeam);
      setIsEditing(null);
      setCurrentTeam("t1");
    } else {
      addPlayer(currentPlayer, currentTeam);
    }
    setCurrentPlayer("");
  };

  const handleEditClick = (id) => {
    const player = players.find((p) => p.id === id);
    setCurrentPlayer(player.name);
    setCurrentTeam(player.team);
    setIsEditing(id);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Configuration des joueurs</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <Form>
            <Form.Check
              type="switch"
              id="equipe-switch"
              label="Mode Equipe"
              checked={isTeamMode}
              onChange={(e) => teamMode(e.target.checked)}
            />
          </Form>
        </div>

        {isTeamMode ? (
          <FormSetupEquipe
            handleSubmit={handleSubmit}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            currentTeam={currentTeam}
            setCurrentTeam={setCurrentTeam}
            isEditing={isEditing}
            players={players}
            teams={teams}
            handleEditClick={handleEditClick}
            removePlayer={removePlayer}
          />
        ) : (
          <FormSetupSolo
            handleSubmit={handleSubmit}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            isEditing={isEditing}
            players={players}
            handleEditClick={handleEditClick}
            removePlayer={removePlayer}
          />
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

export default ModalPlayerSetup;
