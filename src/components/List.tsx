import React, { Component } from "react";
import { Table, ListGroup } from 'react-bootstrap';
import VKMittel from "./VKMittel";

class Liste extends Component<{ items: ListenEintrag[] }> {
    render() {
        return (
            <React.Fragment>
                <Table style={{textAlign: "left"}} striped bordered hover size="md">
                    <thead>
                        <tr>
                            <th>Verkehrsmittel</th>
                            <th>Distanz (km)</th>
                            <th>Co2 (kg)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items.map(listitem => (
                            <tr>
                                <td>{listitem.vkMittel.name}</td>
                                <td>{listitem.km}</td>
                                <td>{Math.round(listitem.km * listitem.vkMittel.co2 * 100) / 100}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ListGroup>

                </ListGroup>
            </React.Fragment>
        );
    }
}

class ListenEintrag {
    km: number;
    vkMittel: VKMittel;

    constructor(km: number, vkMittel: VKMittel) {
        this.km = km;
        this.vkMittel = vkMittel;
    }
}

export { Liste, ListenEintrag };
//export default Liste;