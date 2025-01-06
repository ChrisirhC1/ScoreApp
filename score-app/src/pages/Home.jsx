import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const Home = () => {
    return (
        <Container fluid className="d-flex flex-column min-vh-100">
            <Row>
                <Col>
                    <Header />
                </Col>
            </Row>
            <Row className="flex-grow-1">
                <Col>
                    {/* Contenu principal ici */}
                </Col>
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