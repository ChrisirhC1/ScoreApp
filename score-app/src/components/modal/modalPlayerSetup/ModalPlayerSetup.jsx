import React, { useEffect, useState } from "react";
import { Modal, Button, Form, ListGroup } from "react-bootstrap";
import { usePlayers } from "../../../context/PlayerContext";
import FormSetupSolo from "./FormSetupSolo";
import FormSetupEquipe from "./FormSetupEquipe";

const ModalPlayerSetup = ({ show, setShow }) => {
  const [currentPlayer, setCurrentPlayer] = useState("");
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
  } = usePlayers();

  useEffect(() => {
    setIsTeamMode(getTeamMode());
  }, [getTeamMode]);

  // Ajout ou modification d'un joueur
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing !== null) {
      editPlayer(isEditing, currentPlayer); // Modifier un joueur existant
      setIsEditing(null); // Réinitialiser le mode édition
    } else {
      addPlayer(currentPlayer); // Ajouter un nouveau joueur
    }
    setCurrentPlayer("");
  };

  // Passer en mode édition
  const handleEditClick = (index) => {
    setCurrentPlayer(players[index].name);
    setIsEditing(index);
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
            <>
          <FormSetupEquipe
            handleSubmit={handleSubmit}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            isEditing={isEditing}
            players={players}
            teams={teams}
            handleEditClick={handleEditClick}
            removePlayer={removePlayer}
            />
            </>
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

        {/* 
        {/*Formulaire d'ajout/modification pour solo/}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              {isEditing !== null ? "Modifier le joueur" : "Ajouter un joueur"}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom du joueur"
              value={currentPlayer}
              onChange={(e) => setCurrentPlayer(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            disabled={!currentPlayer.trim()}
          >
            {isEditing !== null ? "Modifier" : "Ajouter"}
          </Button>
        </Form>

        {/* Liste des joueurs avec options Modifier / Supprimer /}
        <ListGroup className="mt-3">
          {players.map((player, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              {player.name}
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditClick(index)}
                  disabled={isEditing !== null}
                >
                  Modifier
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removePlayer(index)}
                  disabled={isEditing !== null}
                >
                  Supprimer
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup> */}
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
