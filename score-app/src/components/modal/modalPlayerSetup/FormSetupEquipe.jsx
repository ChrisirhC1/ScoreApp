import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { usePlayers } from "../../../context/PlayerContext";

const FormSetupEquipe = ({
  handleSubmit,
  currentPlayer,
  setCurrentPlayer,
  isEditing,
  players,
  teams,
  handleEditClick,
  removePlayer,
}) => {
  const { getPlayersByTeam } = usePlayers();

  return (
    <>
      {/*Formulaire d'ajout/modification pour équipe*/}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            {isEditing !== null ? "Modifier un joueur" : "Ajouter un joueur"}
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

      {/* Liste des équipes avec options Modifier / Supprimer */}
      {/* <ListGroup className="mt-3">
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

      {/*liste des equipes. Dans des carrés avec les noms des joueurs et un bouton modifier / supprimer */}
      <Row>
        {teams.map((team) => (
          <Col xs={6}>
            {/*Dans un carré le nom de l'équipe et en dessous les noms des joueurs avec un boutton modifer et supprimer */}
            <ListGroup className="mt-3">
              <ListGroup.Item
                key={team.id}
                className="d-flex justify-content-between align-items-center"
              >
                {team.teamName}
              </ListGroup.Item>
              {getPlayersByTeam(team.id).map((player, index) => (
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
                      ✏
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removePlayer(index)}
                      disabled={isEditing !== null}
                    >
                      ❌
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default FormSetupEquipe;
