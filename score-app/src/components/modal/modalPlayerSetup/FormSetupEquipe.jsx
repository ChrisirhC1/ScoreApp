import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useState } from "react";
import { usePlayers } from "../../../context/PlayerContext";

const FormSetupEquipe = ({
  handleSubmit,
  currentPlayer,
  setCurrentPlayer,
  currentTeam,
  setCurrentTeam,
  isEditing,
  players,
  teams,
  handleEditClick,
  removePlayer,
}) => {
  const { getPlayersByTeam, addTeam, removeTeam, shuffleEquipes } = usePlayers();
  const [hoveredTeamId, setHoveredTeamId] = useState(null);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            {isEditing !== null ? "Modifier un joueur" : "Ajouter un joueur"}
          </Form.Label>
          <Row>
            <Col xs={6}>
              <Form.Control
                type="text"
                placeholder="Nom du joueur"
                value={currentPlayer}
                onChange={(e) => setCurrentPlayer(e.target.value)}
              />
            </Col>
            <Col xs={6}>
              <Form.Select
                value={currentTeam}
                onChange={(e) => setCurrentTeam(e.target.value)}
              >
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>{team.teamName}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          disabled={currentPlayer.trim() === "" && currentTeam === "" }
        >
          {isEditing !== null ? "Modifier" : "Ajouter"}
        </Button>
      </Form>

      <Row>
        {teams.map((team) => (
          <Col xs={6} key={team.id}>
            <ListGroup className="mt-3">
              <ListGroup.Item
                className="d-flex justify-content-between align-items-center"
                onMouseEnter={() => setHoveredTeamId(team.id)}
                onMouseLeave={() => setHoveredTeamId(null)}
                style={{ position: "relative" }}
              >
                {team.teamName}
                {hoveredTeamId === team.id && (
                  <Button
                    variant="none"
                    size="sm"
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      padding: "2px 5px",
                      fontSize: "12px",
                      lineHeight: "1",
                    }}
                    onClick={() => removeTeam(team.id)}
                  >
                    ❌
                  </Button>
                )}
              </ListGroup.Item>
              {getPlayersByTeam(team.id).map((player) => (
                <ListGroup.Item
                  key={player.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div
                    onClick={() => {
                      if (isEditing === null) handleEditClick(player.id);
                    }}
                  >
                    {player.name}
                  </div>
                  <div>
                    <Button
                      variant="none"
                      size="sm"
                      onClick={() => removePlayer(player.id)}
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
        <Col xs={12} className="mt-3">
          <Button
            variant="dark"
            onClick={() => addTeam()}
            style={{ width: "100%" }}
          >
            Ajouter une équipe
          </Button>
        </Col>
        <Col xs={12} className="mt-3">
          <Button
            variant="success"
            onClick={() => shuffleEquipes()}
            style={{ width: "100%" }}
            disabled={players.length <= 1}
          >
            🔀 Shuffle
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default FormSetupEquipe;
