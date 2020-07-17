import React from "react";
import classes from './SmartBox.module.css';
import axios from 'axios';

class SmartBox extends React.Component {


    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        let body = {
            functionBody: this.props.functionBody,
            populationSize: this.props.populationSize,
            minRange: this.props.minRange,
            maxRange: this.props.maxRange,
            maxIterations: this.props.maxIterations,
            maxWithoutChanges: this.props.maxWithoutChanges,
            selectorType: this.props.selectorType,
            crossoverChance: this.props.crossoverChance,
            mutationChance: this.props.mutationChance
        }
        console.log('axios run')
        axios.post('https://function-max-finder-server.herokuapp.com/run', body)
            .then(res => console.log(res))
            .catch(err => alert(err))
    }

    render() {
        return (
            <div className={classes.Box}>
                {this.state.children}
            </div>
        )
    }
}

export default SmartBox;