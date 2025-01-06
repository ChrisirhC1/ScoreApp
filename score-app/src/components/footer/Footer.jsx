
import { Button, Col, Row } from 'react-bootstrap';
import './footer.css';

const Footer = () => {


    return (
        <>
            <Row className="text-center footer">
                <Col xs={12}>


                    <Button variant="success" size='lg'>classement</Button>


                </Col>
            </Row>
        </>
    );
};

export default Footer;