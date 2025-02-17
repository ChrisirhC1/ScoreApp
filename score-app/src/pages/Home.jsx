import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import { usePlayers } from "../context/PlayerContext";
import PlayerCard from "../components/playerCard/PlayerCard";

const Home = () => {
  const { players, teams, getPlayersByTeam, getTeamMode } = usePlayers();

  return (
    <Container fluid className="d-flex flex-column p-3 container">
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className="flex-grow-1">
        <div className="content">
          <Row>
            {getTeamMode() ? (
              <>
                {teams.map((team) => (
                    <Col key={team.id} xs={6} md={6} lg={4}>
                      <h2>{team.teamName}</h2>
                      {getPlayersByTeam(team.id).map((player) => (
                        <PlayerCard key={player.id} playerData={player} />
                      ))}
                    </Col>
                ))}
              </>
            ) : (
              <>
                {players.map((player) => (
                  <Col key={player.id} xs={6} md={6} lg={4}>
                    <PlayerCard playerData={player} />
                  </Col>
                ))}
              </>
            )}
          </Row>
        </div>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
