import React from 'react';
import './App.css';
import { Container, Row, Button, Tabs, Tab, Form, Dropdown, InputGroup, FormControl, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Liste, ListenEintrag } from './components/List';
import VKMittel from "./components/VKMittel";

const tage = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const verkehrsMittel: VKMittel[] = [
  { name: "Elektrobus", co2: 0.01368 },
  { name: "Dieselbus", co2: 0.0362 },
  { name: "Zug im Fernverkehr", co2: 0.032 },
  { name: "Zug im Nahverkehr", co2: 0.0524 },
  { name: "Reisebus", co2: 0.0236 },
  { name: "Straßen und U-Bahn", co2: 0.0548 },
  { name: "Fahrrad", co2: 0.0032 },
  { name: "Pedelec (elektrisch)", co2: 0.0127 },
  { name: "E-Scooter", co2: 0.07 },
  { name: "Kraftrad", co2: 0.0572 },
  { name: "Moped", co2: 0.284 },
  { name: "PKW (elektrisch)", co2: 0.0503 },
  { name: "PKW (H2)", co2: 0.096 },
  { name: "PKW (CNG)", co2: 0.21 },
  { name: "PKW (Benzin)", co2: 0.3465 },
  { name: "PKW (Diesel)", co2: 0.3015 },
];

class App extends React.Component {
  state = {
    liste: tage.reduce((o, key) => Object.assign(o, { [key]: [] }), {}) as { [key: string]: ListenEintrag[]; },
    aktiverTag: tage[0],
    inputKM: 0,
    inputVK: verkehrsMittel[0],
    co2Woche: 0,
    co2Semester: 0,
    alertState: "success"
  };

  componentDidMount(){
    document.title = "CO2 Bilanz"
  }

  addValue = () => {
    this.state.liste[this.state.aktiverTag].push(new ListenEintrag(this.state.inputKM, this.state.inputVK));

    this.setState({ liste: this.state.liste });

    var co2Woche = 0;

    //Berechnen
    tage.forEach(tag => {
      var items = this.state.liste[tag];

      items.forEach(eintrag => {
        co2Woche += eintrag.km * eintrag.vkMittel.co2;
      });
    });

    co2Woche = Math.round(co2Woche * 10) / 10;

    this.setState({ co2Woche: co2Woche });
    this.setState({ co2Semester: Math.round(co2Woche * 14 * 10) / 10});

    if(co2Woche < 20) this.setState({alertState: "success"});
    else if(co2Woche < 40) this.setState({alertState: "warning"});
    else this.setState({alertState: "danger"});
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <title>CO2 Bilanz</title>
          <h1>CO2 Bilanz</h1>
          <h2>Berechne deinen CO2 Ausstoß auf deinem Weg zur Hochschule</h2>
        </header>

        <main className="p-1">
          <Container className="mt-5">
            <h3 className="text-left">Wähle das Verkehrsmittel aus und trage die zurückgelegten Kilometer für die jeweiligen Wochentage ein!</h3>
            <Row className="my-3">
              <Tabs variant="pills" defaultActiveKey={this.state.aktiverTag} onSelect={e => this.setState({ aktiverTag: e })}>
                {tage.map(tag => (
                  <Tab title={tag} eventKey={tag}></Tab>
                ))}
              </Tabs>
            </Row>

            <Row className="my-3 p-0">
              <Form className="p-0" onSubmit={this.addValue} action="#">
                <InputGroup className="mb-3 p-0">
                  <Dropdown onSelect={e => this.setState({ inputVK: verkehrsMittel.filter(x => x.name === e)[0] })}>
                    <Dropdown.Toggle variant="success" id="verkehrsmittel">
                      {this.state.inputVK.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu defaultValue={this.state.inputVK.name}>
                      {verkehrsMittel.map(vk => (
                        <Dropdown.Item eventKey={vk.name}>{vk.name}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>

                  </Dropdown>

                  <FormControl type="number" id="strecke" aria-describedby="basic-addon3" placeholder="Distanz (km)"
                    value={this.state.inputKM} onChange={e => this.setState({ inputKM: e.target.value.replaceAll(",", ".") })} />

                  <Button variant="outline-secondary" id="addButton" onClick={this.addValue}>
                  ➕
                  </Button>
                </InputGroup>
              </Form>
            </Row>

            <Row>
              <Liste items={this.state.liste[this.state.aktiverTag]}></Liste>
            </Row>

            <Row className="my-5">
              <h1 className="text-left">Dein CO2 Austoß:</h1>
              
              <Alert variant={this.state.alertState}>
                <h2 className="text-left">pro Woche: {this.state.co2Woche}kg</h2>
                <h2 className="text-left">pro Semester: {this.state.co2Semester}kg</h2>
              </Alert>
            </Row>

          </Container>
        </main>

        <footer className="App-footer">
        <p style={{fontSize: 15}}>Copyright © 2021 Hendrik Mennen</p>
        </footer>
      </div>
    );
  }
}

export default App;
