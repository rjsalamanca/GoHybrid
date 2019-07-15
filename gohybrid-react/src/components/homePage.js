import React, { Component } from 'react';
import { Container, Form } from 'react-bootstrap';

const convert = require('xml-js');

const makeFlex = {
    display: 'flex'
}

class HomePage extends Component {
    state = {
        getYears: [],
        getMakes: [],
        getModels: [],
        year: null,
        make: '',
        model: '',
        searchParameters: ''
    }

    componentDidMount = () => {
        this.loadYears();
    }

    // componentDidUpdate = () => {
    //     const { year, make } = this.state;
    //     if (year !== null) {
    //         this.loadMakes();
    //     }
    //     //this.loadMakes();
    // }

    loadYears = async () => {
        const url = "https://www.fueleconomy.gov/ws/rest/vehicle/menu/year";

        try {
            const response = await fetch(url)
            const responseToText = await response.text();
            const dataAsJson = JSON.parse(convert.xml2json(responseToText, { compact: true, spaces: 4 })).menuItems.menuItem;
            const years = dataAsJson.map(year => parseInt(year.value._text));
            this.setState({ getYears: years })
        } catch (err) {
            console.log(err.message)
        }
    }

    loadMakes = async () => {
        const url = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${this.state.year}`;
        try {
            const response = await fetch(url)
            const responseToText = await response.text();
            const dataAsJson = JSON.parse(convert.xml2json(responseToText, { compact: true, spaces: 4 })).menuItems.menuItem;
            const carMakes = dataAsJson.map(make => make.value._text);
            this.setState({ getMakes: carMakes })
        } catch (err) {
            console.log(err.message)
        }
    }

    loadModels = async () => {
        const url = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${this.state.year}&make=${this.state.make}`;
        try {
            const response = await fetch(url)
            const responseToText = await response.text();
            const dataAsJson = JSON.parse(convert.xml2json(responseToText, { compact: true, spaces: 4 })).menuItems.menuItem;
            const carModels = dataAsJson.map(model => model.value._text);
            this.setState({ getModels: carModels })
        } catch (err) {
            console.log(err.message)
        }
    }

    handleYear = async (e) => {
        if (e.target.value !== 'Year') {
            await this.setState({ year: e.target.value });
            this.loadMakes();
        }
    }

    handleMake = async (e) => {
        if (e.target.value !== 'Make') {
            await this.setState({ make: e.target.value })
            this.loadModels();
        }
    }

    handleModel = (e) => {
        if (e.target.value !== 'Model') {
            this.setState({ model: e.target.value })
        }
    }

    render() {
        const { getYears, getMakes, getModels, make, model, year } = this.state
        return (
            <div>
                <h1>Go Hybrid - Home Page</h1>
                <Container id="carLookUpContainer" style={makeFlex}>
                    <div id="sideBar">
                        <h3>Search:</h3>
                        <Form.Control onChange={(e) => this.handleYear(e)} as="select">
                            <option>Year</option>
                            {getYears.length !== 0 ?
                                getYears.map(singleYear =>
                                    <option key={`year-lookup-${singleYear}`}>{singleYear}</option>
                                )
                                :
                                <option disabled>Loading Years...</option>
                            }
                        </Form.Control>
                        <Form.Control onChange={(e) => this.handleMake(e)} as="select">
                            <option>Make</option>
                            {getMakes.length !== 0 ?
                                getMakes.map(singleMake =>
                                    <option key={`manufacturer-${singleMake}`}>{singleMake}</option>
                                )
                                :
                                <option disabled>Choose a Year First...</option>
                            }
                        </Form.Control>
                        <Form.Control onChange={(e) => this.handleModel(e)} as="select">
                            <option>Model</option>
                            {getModels.length !== 0 ?
                                getModels.map(singleModel =>
                                    <option key={`${make}-${singleModel}`}>{singleModel}</option>
                                )
                                :
                                <option disabled>Choose a Year First...</option>
                            }
                        </Form.Control>
                    </div>
                    <div id="mainContainer">
                        <div>Whats up</div>
                        <p>Year: {year}</p>
                        <p>Make: {make}</p>
                        <p>Model: {model}</p>
                    </div>
                </Container>
            </div >
        )
    }
}

export default HomePage;