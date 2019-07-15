import React, { Component } from 'react';

class HomePage extends Component {
    // state = {
    //     isLoggedIn: Boolean
    // }

    // async componentDidMount() {
    //     await this.setState({
    //         isLoggedIn: this.props.isLoggedIn
    //     })
    // }

    // loadData = async () => {
    //     const url = 'http://localhost:3000/v1/post';
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     return data;
    // }

    render() {
        const { isLoggedIn } = this.props;
        // const { isLoggedIn } = this.state;

        return (
            <div>
                <h1>Logged In Status: {isLoggedIn.toString()}</h1>
            </div>
        )
    }
}

export default HomePage;