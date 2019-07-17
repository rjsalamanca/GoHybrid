import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Row, Col, Table } from 'react-bootstrap';

const convert = require('xml-js');

class CompareModels extends Component {
    state = {
        redirect: false,
        car1: undefined,
        car2: undefined,
        car1Display: '',
        car2Display: '',
        carCompare: {},
        fuelPrices: {}
    }

    componentDidMount = () => {
        if (this.props.location.hasOwnProperty('findID') === false || this.props.location.state === undefined) {
            this.setState({ redirect: true })
        } else {
            this.getGasPrices();
            this.vehicles(this.props.location.state.car)
        }
    }

    componentDidUpdate = () => {
        const { car1, car2 } = this.state;
        if (car1 !== undefined && car2 !== undefined) {
            if (typeof car2 === 'object') {

            }
        } else {
            console.log('loading')
        }
    }

    getGasPrices = async () => {
        const url = `https://www.fueleconomy.gov/ws/rest/fuelprices`;
        try {
            const response = await fetch(url)
            const responseToText = await response.text();
            const dataAsJson = JSON.parse(convert.xml2json(responseToText, { compact: true, spaces: 4 })).fuelPrices;
            this.setState({ fuelPrices: dataAsJson })
        } catch (err) {
            console.log(err.message)
        }
    }

    vehicles = async (carObj) => {
        const { year, make, car } = this.props.location.state;

        //get the details of vehicle 1
        const vehicle1Details = await this.getVehicleDetails(carObj.id);
        vehicle1Details['combinedMpg'] = (parseInt(vehicle1Details.city08._text) + parseInt(vehicle1Details.highway08._text)) / 2;
        vehicle1Details['amountGasPerYear'] = ((13476 / vehicle1Details.combinedMpg) * this.state.fuelPrices[vehicle1Details.fuelType._text.toLowerCase()]._text).toFixed(2);

        let vehicle2Details = 'No Gas Model Available'

        //get the id of vehicle 2
        const searchVehicle2 = car.model.replace(/Hybrid\s|Hybrid|\sHybrid\s/g, ' ');
        const vehicle2Id = await this.props.location.findID(year, make, searchVehicle2);

        if (typeof vehicle2Id === 'number') {
            vehicle2Details = await this.getVehicleDetails(vehicle2Id);
            vehicle2Details['combinedMpg'] = (parseInt(vehicle2Details.city08._text) + parseInt(vehicle2Details.highway08._text)) / 2;
            vehicle2Details['amountGasPerYear'] = ((13476 / vehicle2Details.combinedMpg) * this.state.fuelPrices[vehicle2Details.fuelType._text.toLowerCase()]._text).toFixed(2);
        }

        this.setState({ car1: vehicle1Details, car2: vehicle2Details })
    }

    getVehicleDetails = async (carID) => {
        const url = `https://www.fueleconomy.gov/ws/rest/vehicle/${carID}`;
        try {
            const response = await fetch(url)
            const responseToText = await response.text();
            const dataAsJson = JSON.parse(convert.xml2json(responseToText, { compact: true, spaces: 4 })).vehicle;
            return dataAsJson;
        } catch (err) {
            console.log(err.message)
        }
    }

    displayCarDetails = (car) => {

        return (

            <Table striped bordered hover size="sm">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" colSpan="2">{car.model._text}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Fuel Type:</td>
                        <td>{car.fuelType._text}</td>
                    </tr>
                    <tr>
                        <td>Fuel Efficency Score:</td>
                        <td>{car.feScore._text}</td>
                    </tr>
                    <tr>
                        <td>City MPG: UCity:</td>
                        <td>{car.city08._text}</td>
                    </tr>
                    <tr>
                        <td>Highway MPG:</td>
                        <td>{car.highway08._text}</td>
                    </tr>
                    <tr>
                        <td>Combined MPG:</td>
                        <td>{car.combinedMpg}</td>
                    </tr>
                    <tr>
                        <td>
                            Amount Spent On Gas Per Year:<br />
                            <small style={{ fontSize: '0.5em', lineHeight: '0.7' }}>Based on the average miles driven per year in America: 13476 Miles</small>
                        </td>
                        <td>${car.amountGasPerYear}</td>
                    </tr>
                </tbody>
            </Table >
        )
    }

    render() {
        const { car1, car2 } = this.state;
        console.log(this.props)
        return (
            <>
                {car1 === undefined && car2 === undefined ?
                    <div>
                        loading
                    </div>
                    :
                    <div>
                        <Container id='compareModelsContainer' className="shadow-lg rounded">
                            <h3>{this.props.location.state.make} {car1.model._text} vs. {this.props.location.state.make} {typeof car2 !== 'object' ? car2 : car2.model._text}</h3>

                            <Row>
                                <img className="compareModelMainImage shadow rounded" src={this.props.location.state.car.img} alt={car1.model._text} />
                            </Row>
                            <Row>
                                <Col>
                                    {this.displayCarDetails(car1)}
                                </Col>
                                <Col>
                                    {this.displayCarDetails(car2)}
                                </Col>
                            </Row>
                            <Row>
                                <p>
                                    If you go hybrid you will save <b>${car2.amountGasPerYear - car1.amountGasPerYear}</b> per year
                                </p>
                            </Row>
                        </Container>
                    </div>
                }
                {!!this.state.redirect ? <Redirect to="/" /> : ""}
            </>
        )
    }
}

export default CompareModels