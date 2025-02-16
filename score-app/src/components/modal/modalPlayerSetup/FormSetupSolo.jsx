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
        <Button type="submit" variant="primary" disabled={!currentPlayer.trim()}>
          {isEditing !== null ? "Modifier" : "Ajouter"}
        </Button>
      </Form>

      <ListGroup className="mt-3">
        {players.map((player) => (
          <ListGroup.Item
            key={player.id}
            className="d-flex justify-content-between align-items-center"
          >
            {player.name}
            <div>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => handleEditClick(player.id)}
                disabled={isEditing !== null}
              >
                Modifier
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removePlayer(player.id)}
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
