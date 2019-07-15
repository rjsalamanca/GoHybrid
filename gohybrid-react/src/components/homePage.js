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
        year: 2019,
        make: '',
        model: '',
        searchParameters: ''
    }

    componentDidMount = () => {
        this.loadYears();
    }

    componentDidUpdate = () => {
        //this.loadMakes();

        console.log('hi')
    }

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

        const url = "https://www.fueleconomy.gov/ws/rest/ympg/shared/vehicles?make=Toyota";

        try {
            const response = await fetch(url)
            const responseToText = await response.text();
            const dataAsJson = JSON.parse(convert.xml2json(responseToText, { compact: true, spaces: 4 })).vehicles;
            // this.setState({ makes: data.Results });

            //var result1 = convert.xml2json(xml, {compact: true, spaces: 4});

        } catch (err) {
            // console.log(err.message)
        }
    }

    handleMake = (e) => {
        if (e.target.value !== 'Make') {
            this.setState({
                make: e.target.value
            })
        }
    }

    handleModel = (e) => {
        if (e.target.value !== 'Model') {
            this.setState({
                model: e.target.value
            })
        }
    }

    handleYear = (e) => {
        if (e.target.value !== 'Year') {
            this.setState({
                year: e.target.value
            })
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
                                getYears.map((singleYear, index) =>
                                    <option key={`year-lookup-${singleYear}`}>{singleYear}</option>
                                )
                                :
                                <option disabled>Loading Years...</option>
                            }
                        </Form.Control>
                        <Form.Control onChange={(e) => this.handleMake(e)} as="select">
                            <option>Make</option>
                            <option>Toyota</option>
                        </Form.Control>
                        <Form.Control onChange={(e) => this.handleModel(e)} as="select">
                            <option>Model</option>
                            <option>Rav 4</option>
                            <option>Camry</option>
                            <option>Corolla</option>
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