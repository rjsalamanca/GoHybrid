import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const convert = require('xml-js');

class CompareModels extends Component {
    state = {
        redirect: false,
        car1: undefined,
        car2: undefined
    }

    componentDidMount = () => {
        (this.props.location.hasOwnProperty('findID') === false || this.props.location.state === undefined) ?
            this.setState({ redirect: true })
            :
            this.vehicles(this.props.location.state.car)
    }

    componentDidUpdate = () => {

    }

    vehicles = async (carObj) => {
        const { year, make, car } = this.props.location.state;
        //get the details of vehicle 1

        const vehicle1Details = await this.getVehicleDetails(carObj.id);
        let vehicle2Details = 'Not Found'

        //get the id of vehicle 2
        const searchVehicle2 = car.model.replace(/Hybrid\s|Hybrid|\sHybrid\s/g, ' ');
        const vehicle2Id = await this.props.location.findID(year, make, searchVehicle2);

        if (typeof vehicle2Id === 'number') {
            vehicle2Details = await this.getVehicleDetails(vehicle2Id);
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

    render() {
        const { car1, car2 } = this.state;

        return (
            <div>
                <h1>Comparing: </h1>
                {!!this.state.redirect ? <Redirect to="/" /> : ''}
            </div>
        )
    }
}

export default CompareModels