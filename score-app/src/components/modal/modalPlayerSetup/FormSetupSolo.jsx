import { Button, Form, ListGroup } from "react-bootstrap";

const FormSetupSolo = ({
  handleSubmit,
  currentPlayer,
  setCurrentPlayer,
  isEditing,
  players,
  handleEditClick,
  removePlayer,
}) => {
  return (
    <> 
      {/*Formulaire d'ajout/modification pour solo*/}

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

      {/* Liste des joueurs avec options Modifier / Supprimer */}
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
      </ListGroup>
    </>
  );
};

export default FormSetupSolo;
