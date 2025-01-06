import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

import { usePlayers } from '../context/PlayerContext';
import PlayerCard from '../components/playerCard/PlayerCard';

const Home = () => {

    const { players } = usePlayers();
    return (
        <Container fluid className="d-flex flex-column min-vh-100 p-3">
            <Row>
                <Col>
                    <Header />
                </Col>
            </Row>
            <Row className="flex-grow-1">
                <div className='content'>
                    <Row>
                        {players.map((player, index) => (
                            <Col key={index} xs={6} md={6} lg={4}>
                                <PlayerCard playerData={player} index={index} />
                            </Col>
                        ))}
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
}

export default Home;