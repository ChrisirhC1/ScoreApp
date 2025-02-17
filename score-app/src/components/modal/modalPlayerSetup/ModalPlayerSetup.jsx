import React, { useEffect, useState } from "react";
import { Modal, Button, Form, ListGroup } from "react-bootstrap";
import { usePlayers } from "../../../context/PlayerContext";
import FormSetupSolo from "./FormSetupSolo";
import FormSetupEquipe from "./FormSetupEquipe";

const ModalPlayerSetup = ({ show, setShow }) => {
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [currentTeam, setCurrentTeam] = useState("");
  const [isEditing, setIsEditing] = useState(null); // Gestion de l'édition
  const [isTeamMode, setIsTeamMode] = useState(false); // Gestion du mode équipe
  const {
    players,
    teams,
    addPlayer,
    editPlayer,
    removePlayer,
    teamMode,
    getTeamMode,
    movePlayer,
  } = usePlayers();

  useEffect(() => {
    setIsTeamMode(getTeamMode());

  }, [getTeamMode]);

  // Ajout ou modification d'un joueur
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing !== null) {
      editPlayer(isEditing, currentPlayer); // Modifier un joueur existant
      movePlayer(isEditing, currentTeam);
      setIsEditing(null); // Réinitialiser le mode édition
      setCurrentTeam("");
    } else {
      addPlayer(currentPlayer, currentTeam); // Ajouter un nouveau joueur
    }
    setCurrentPlayer("");
  };

  // Passer en mode édition
  const handleEditClick = (id) => {
    const player = players.find((player) => player.id === id);
    setCurrentPlayer(player.name);
    setCurrentTeam(player.team);
    setIsEditing(id);
  };

  const handleTeamMode = (e) => {
    setIsTeamMode(e.target.checked);
    teamMode(e.target.checked);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Configuration des joueurs</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Modes */}
        <div className="mb-3">
          {/* btn switch "mode Equipe" */}
          <Form>
            <Form.Check
              type="switch"
              id="equipe-switch"
              label="Mode Equipe"
              checked={isTeamMode}
              onChange={(e) => handleTeamMode(e)}
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
