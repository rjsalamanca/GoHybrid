import React, { Component } from 'react';

class HomePage extends Component {
    state = {
        posts: []
    }

    async componentDidMount() {
        const posts = await this.loadData();
        this.setState({
            posts: posts
        })
    }

    loadData = async () => {
        const url = 'http://localhost:3000/v1/post';
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    render() {
        return (
            <div>
                <h1>Home Page</h1>
            </div>
        )
    }
}

export default HomePage;