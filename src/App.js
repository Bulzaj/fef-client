import React from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import Box from "./components/box/Box";
import Input from "./components/form/Input/Input";
import Form from "./components/form/Form";

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            functionBody: "",
            variables: [],
            showVariablesDialog: false
        }
    }

    onFunctionChangeHandler = (event) => {
        this.setState({functionBody: event.target.value});
    }

    onVariableChangeHandler = (event) => {

    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let tmpFunctionBody = [...this.state.functionBody] + '';
        let tmpVariables = [];
        tmpFunctionBody.split("").map(a => {
            if (a.match('[a-e]')) {
                if (!tmpVariables.includes(a)) {
                    tmpVariables.push(a);
                }
            }
        });
        this.setState({variables: tmpVariables})
        this.setState({showVariablesDialog: true})
    }

    render() {

        let functionVariables;
        if (this.state.showVariablesDialog) {
            let tmpVariables = [...this.state.variables];
            let variablesArray = [];
            tmpVariables.forEach((element) => {
               let functionVariable = (
                   <Input
                       key={element}
                       type='text'
                       placeholder={'Var ' + element }
                       onChangeHandler={this.onVariableChangeHandler}/>
               )
                variablesArray.push(functionVariable);
            });
            functionVariables = (
                <Box>
                    {variablesArray}
                </Box>
            )
        }

        return (
            <div>
                <Navbar title='Function max finder'/>
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
                {functionVariables}

            </div>
        );
    }


}

export default App;
