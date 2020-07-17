import React from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import Box from "./components/box/Box";
import Input from "./components/form/Input/Input";
import Form from "./components/form/Form";
import SmartBox from "./components/box/smartbox/SmartBox";

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            functionBody: "",
            variables: [],
            populationSize: null,
            minRange: null,
            maxRange: null,
            maxIterations: null,
            maxWithoutChanges: null,
            selectorType: null,
            crossoverChance: null,
            mutationChance: null,
            showFunctionBodyDialog: true,
            showVariablesDialog: false,
            showPropertiesDialog: false,
            showResultDialog: false,
        }
    }

    onFunctionChangeHandler = (event) => {
        this.setState({functionBody: event.target.value});
    }

    onVariableChangeHandler = (event, key) => {
        let tmpVariables = [...this.state.variables]
        let tmpObj = tmpVariables.find(element => element.key === key);
        tmpObj.value = event.target.value;
        tmpVariables.forEach(element => {
           if (element.key === tmpObj.key) element = tmpObj
        });
        this.setState({variables: tmpVariables});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let tmpFunctionBody = [...this.state.functionBody] + '';
        let tmpVariables = [];
        let tmpVariablesWithValues = [];
        tmpFunctionBody.split("").map(a => {
            if (a.match('[a-e]')) {
                if (!tmpVariables.includes(a)) {
                    tmpVariables.push(a);
                }
            }
        });
        tmpVariables.forEach(variable => {
            tmpVariablesWithValues.push({key: variable, value: 0});
        })
        this.setState({variables: tmpVariablesWithValues})
        this.setState({showVariablesDialog: true})
        this.setState({showFunctionBodyDialog: false})
    }

    onReplaceSubmitHandler = (event)=> {
        event.preventDefault();
        let functionBody = [...this.state.functionBody]+'';
        let newFunctionBody = '';
        functionBody.split("").forEach(char => {
            if (char.match('[a-e]')) {
                for (let i=0; i<this.state.variables.length; i++) {
                    if (char === this.state.variables[i].key) {
                        newFunctionBody += this.state.variables[i].value;
                    }
                }
            } else newFunctionBody += char;
        })
        let stringResult = '';
        newFunctionBody.split(',').forEach(element => stringResult+=element);
        this.setState({functionBody: stringResult});
        this.setState({showPropertiesDialog: true});
        this.setState({showFunctionBodyDialog: false})
        this.setState({showVariablesDialog: false})
    }

    onPropertiesChangeHandler = event => {
        switch (event.target.name) {
            case 'populationSize':
                this.setState({populationSize: event.target.value})
                break;
            case 'maxRange':
                this.setState({maxRange: event.target.value})
                break;
            case 'maxIterations':
                this.setState({maxIterations: event.target.value})
                break;
            case 'maxWithoutChanges':
                this.setState({maxWithoutChanges: event.target.value})
                break;
            case 'crossoverChance':
                this.setState({crossoverChance: event.target.value})
                console.log(event.target.value)
                break;
            case 'mutationChance':
                this.setState({mutationChance: event.target.value})
                break;
            case 'selectorType':
                this.setState({selectorType: event.target.value})
        }
    }

    onPropertiesSubmitChandler = event => {
        event.preventDefault();
        console.log('properties submit')
        this.setState({minRange: 0});
        this.setState({selectorType: 'ROULETTE WHEEL'});
        console.table(this.state);
    }



    render() {

        let functionBody;
        if (this.state.showFunctionBodyDialog) {
            functionBody = (
                <Box>
                    <Form handleSubmit={this.onSubmitHandler}>
                        <Input
                            type='text'
                            placeholder='Function body...'
                            value={this.state.functionBody}
                            onChangeHandler={this.onFunctionChangeHandler}/>
                        <Input
                            type='submit'
                            value='Compute'/>
                    </Form>
                </Box>
            )
        }

        let functionVariables;
        if (this.state.showVariablesDialog) {
            let tmpVariables = [...this.state.variables];
            let variablesArray = [];
            tmpVariables.forEach((element) => {
               let functionVariable = (
                   <Input
                       key={element.key}
                       name={element.key}
                       type='number'
                       placeholder={'Var ' + element.key }
                       onChangeHandler={(event) => this.onVariableChangeHandler(event, element.key)}/>
               )
                variablesArray.push(functionVariable);
            });
            functionVariables = (
                <Box>
                    <Form handleSubmit={this.onReplaceSubmitHandler}>
                        {variablesArray}
                        <div>
                            <Input type='submit' value='Replace'/>
                        </div>
                    </Form>
                </Box>
            )
        }

        let functionProperties;
        if (this.state.showPropertiesDialog) {
            functionProperties =  (
                <Box>
                    <Form onSubmit={this.onPropertiesSubmitChandler}>
                        <Input
                            name='populationSize'
                            type='number'
                            placeholder='Population size'
                            value={this.state.populationSize}
                            onChangeHandler={this.onPropertiesChangeHandler}/>
                        <Input
                            name='minRange'
                            type='number'
                            placeholder='Min range = 0'
                            disabled
                            value={this.state.minRange}
                            onChangeHandler={this.onPropertiesChangeHandler}/>
                        <Input
                            name='maxRange'
                            type='number'
                            placeholder='Max range'
                            value={this.state.maxRange}
                            onChangeHandler={this.onPropertiesChangeHandler}/>
                        <Input
                            name='maxIterations'
                            type='number'
                            placeholder='Max iterations'
                            value={this.state.maxIterations}
                            onChangeHandler={this.onPropertiesChangeHandler}/>
                        <Input
                            name='maxWithoutChanges'
                            type='number'
                            placeholder='Max without changes'
                            value={this.state.maxWithoutChanges}
                            onChangeHandler={this.onPropertiesChangeHandler}/>
                        <Input
                            name='crossoverChance'
                            type='number'
                            placeholder='Crossover chance'
                            value={this.state.crossoverChance}
                            onChangeHandler={this.onPropertiesChangeHandler}/>
                        <Input
                            name='mutationChance'
                            type='number'
                            placeholder='Mutation chance'
                            value={this.state.mutationChance}
                            onChangeHandler={this.onPropertiesChangeHandler}/>
                        <Input
                            name='selectorType'
                            type='text'
                            placeholder='Selector Type (Roulette wheel only for now'
                            disabled
                            value={this.state.selectorType}
                            onChangeHandler={this.onPropertiesChangeHandler}/>
                        <Input type='submit'
                        />
                    </Form>
                </Box>
            )
        }

        // let resultDialog;
        // if (this.state.showResultDialog) {
        //     resultDialog = (
        //         <SmartBox
        //             functionBody= {this.state.functionBody}
        //             populationSize= {this.state.populationSize}
        //             minRange= {this.state.minRange}
        //             maxRange= {this.state.maxRange}
        //             maxIterations= {this.state.maxIterations}
        //             maxWithoutChanges= {this.state.maxWithoutChanges}
        //             selectorType= {this.state.selectorType}
        //             crossoverChance= {this.state.crossoverChance}
        //             mutationChance= {this.state.mutationChance}/>
        //     )
        // }

        return (
            <div>
                <Navbar title='Function max finder'/>
                <Box>
                    <h1>{this.state.functionBody}</h1>
                </Box>
                {functionBody}
                {functionVariables}
                {functionProperties}
                {/*{resultDialog}*/}
            </div>
        );
    }


}

export default App;
