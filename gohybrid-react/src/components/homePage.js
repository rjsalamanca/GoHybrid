import React, { Component } from 'react';
import { Container, Form, Card } from 'react-bootstrap';
import noImageAvailable from '../placeholderCar.png'

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
        showCurrentSelection: [],
        showCars: false
    }

    componentDidMount = () => {
        this.loadYears();
    }

    componentDidUpdate = () => {
        if (this.state.model === '' && this.state.showCars === false && this.state.getModels.length !== 0) {
            this.setState({
                showCurrentSelection: this.state.getModels,
                showCars: true
            })
        }
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
            let dataAsJson = JSON.parse(convert.xml2json(responseToText, { compact: true, spaces: 4 })).menuItems.menuItem;

            if (typeof dataAsJson === 'object') {
                dataAsJson = Array.from(dataAsJson);
            }

            const carModels = dataAsJson.map(model => model.value._text);
            let carModelImages = await carModels.map(async model => await this.tryThis(model))
            await Promise.all(carModelImages).then((cars) => carModelImages = cars);

            const modelsAndImages = carModels.map((model, index) => {
                return { model, img: carModelImages[index] }
            })

            this.setState({ getModels: modelsAndImages });
        } catch (err) {
            console.log(err.message)
        }
    }

    getModelImages = async (carModel) => {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.year + ' ' + this.state.make + ' ' + carModel}&key=AIzaSyB9WzlCfQKAWzLTqAsrcepelEEUT4b8NPk`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.items[0].snippet.thumbnails.medium.url;
        } catch (err) {
            return err;
        }
    }

    tryThis = async (carModel) => {
        const searchMakeAndModel = (this.state.make + "_" + carModel).split(' ').join('_');
        let wikiURL = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&origin=%2A&titles=${searchMakeAndModel}&pithumbsize=250&format=json`;

        try {
            const response = await fetch(wikiURL);
            const data = await response.json();
            return data.query.pages[Object.keys(data.query.pages)].thumbnail.source;
        } catch (err) {
            const getImageFromYoutube = await this.getModelImages(carModel);

            if (typeof getImageFromYoutube === 'object') {
                return noImageAvailable
            }
            return getImageFromYoutube;
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
        const { getYears, getMakes, getModels, make, model, year, showCurrentSelection } = this.state;
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
                                    <option key={`${make}-${singleModel.model}`}>{singleModel.model}</option>
                                )
                                :
                                <option disabled>Choose a Year First...</option>
                            }
                        </Form.Control>
                    </div>
                    <div id="mainContainer">
                        <div className="searchParameters">
                            <p>Year: {year}</p>
                            <p>Make: {make}</p>
                            <p>Model: {model}</p>
                        </div>
                        <div className="carModels">
                            {showCurrentSelection.map((car, index) =>
                                <Card className='carCard' key={car + index} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={car.img} alt={car.model} />
                                    <Card.Body>
                                        <Card.Title>{car.model}</Card.Title>
                                    </Card.Body>
                                </Card>
                            )}
                        </div>
                    </div>
                </Container>
            </div >
        )
    }
}

export default HomePage;