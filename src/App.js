import React, { Component } from 'react';
import './App.css';
import QrReader from 'react-qr-scanner'
import { Container, Row, Col } from 'react-bootstrap';

const QRScanner = props => {
  return (
    <QrReader onScan={props.onScan} onError={props.onError} delay={props.delay} />
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: '',
      delay: 100,
      nullResCount: 0,
    };
  }

  handleOnScan = (res) => {
    if (!res && this.state.nullResCount <= 20)
      this.setState({ ...this.state, nullResCount: this.state.nullResCount + 1 });
    else if (!res && this.state.nullResCount >= 20)
      this.setState({ ...this.state, response: 'Please show valid QR Code', nullResCount: 0, delay: false });
    else {
      this.setState({ ...this.state, delay: 1000, nullResCount: 0, response: res });
      window.location.href = res;
    }

  };

  handleScanError = (error) => {
    error = error.toString();
    console.log(error);
    switch (error) {
      case error.toLowerCase().includes('permission'):
        this.setState({ response: 'Please give access to use camera' });
        break;

      default:
        this.setState({ response: 'Something went wrong while scanning' });
        break;
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs={6} className="left-portion">
            <h1 className="text-center">QR Scanner</h1>
            <div className="d-flex justify-content-end">Scan Your QR Code here
              <span className="emoji" role="img" aria-label="right-hand-direction" aria-hidden="false">&#128073;</span>
            </div>
            {this.state.response && <div>Result: {this.state.response}</div>}
          </Col>
          <Col xs={6}>
            <QRScanner
              onScan={this.handleOnScan}
              onError={this.handleScanError}
              delay={this.state.delay}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
