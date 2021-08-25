import React, { Component } from "react";
import Film from "./Film";

class Films extends Component {
    constructor(props) {
        // State & Props
        super(props)
        console.log(this.props)
        this.state = { 
            loaded: false,
            results: [],
            people: [],
            id: [],
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

    // After the results are set, if the people array is empty, get all the people from each film
    
    async componentDidUpdate() {
        let { people, results, id } = this.state;
        let peopleUrls = [];
        let ids = [];
        if (results && people.length === 0 ){
            for (let i = 0; i < results.length; i++) {
                for (let j = 0; j < results[i].people.length; j++){
                    console.log(results[i].people[j]);
                    ids.push(results[i].id);
                    peopleUrls.push(`https://ghibliapi.herokuapp.com/people/${ids[j]}`);
                }
            }
            console.log(ids);
            console.log(results);
            console.log(peopleUrls);
            for (let k = 0; k < peopleUrls.length; k++) {
                let peopleRes = await fetch(peopleUrls);
                let peopleJson = await peopleRes.json();
                
                this.setState({
                    people: peopleJson,
                })

                console.log(people);
            }
        }
    }

    render() {
        return (
        <div>
            <div>
            {!this.state.loaded 
                ? "Loading"
                : this.state.results.map(film=> <Film film={film}/>)
            }
            </div>
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