import React, { Component } from "react";

class Films extends Component {
    constructor() {
        // State & Props
        super()
        this.state = { 
            loaded: false,
            results: []
        }
    }
    
    // this is the same goal as useEffect(() => {}, [])
    async componentDidMount() {
        let res = await fetch("https://ghibliapi.herokuapp.com/films");
        let json = await res.json();
        console.log(json);

        this.setState({ 
            loaded: true,
            results: json,
        })
    }

    render() {
        return (
        <div>
            {!this.state.loaded 
                ? "Loading"
                : this.state.results.map((film, index, description)=> <li key={index}>{film.title}</li>)
            }
        </div>
        )
    }
}

/*
const Films = () => {
    return (
        <>
            this is the films component
        </>
    )
}
*/

export default Films;