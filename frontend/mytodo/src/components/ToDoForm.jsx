import React, {useState, useEffect} from 'react'
import '../App.css';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import {TextField,  Button, Typography } from '@material-ui/core';
import useForm from './useForm';
import {connect} from 'react-redux';
import * as actions from "../actions/ToDo";
import ButterToast,{Cinnamon} from 'butter-toast';
import { AssignmentTurnedIn } from "@material-ui/icons";
 
const initialFieldValues = {
    todo: '',
    date: ''
}

 

const ToDoForm = ({classes, ...props}) => {
    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.ToDoList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])
    
    const validate = () => {
        let temp = { ...errors }
        temp.todo = values.todo ? "" : "This field is required."
        temp.date = values.date ? "" : "This field is required."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues,props.setCurrentId)

     
     
    
    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () =>{
            ButterToast.raise({
                content:<Cinnamon.Crisp title="Post Box"
                    content="Submitted Successfully"
                    scheme = { Cinnamon.Crisp.SCHEME_PURPLE }
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetForm()
        }
        if (validate()) {
            if(props.currentId == 0)
            props.createToDo(values,onSuccess)
            else
            props. updateToDo(props.currentId,values,onSuccess)
        }
    }

     

    const Todo = { marginTop: '100px',marginLeft: '100px',  };
    const Date = { marginLeft: '0px', width: '50%', align:'center' };
    const smt = { marginLeft:'70px' }
    return (
        <form autocomplete="off" noValidate onSubmit={handleSubmit}>
        <div style={Todo}>
        <TextField 
        margin="normal"
        fullwidth
        variant="outlined"
        name="todo"
        placeholder="To Do"
        value={values.todo}
        onChange={handleInputChange}
        {...(errors.todo && { error: true, helperText: errors.todo })}
        /> 
        <br /><br /><br />
        <div style={Date}>     
        <DatePickerComponent halfwidth name="date" halfwidth variant="outlined" placeholder="Select Date ->" value={values.date} onChange={handleInputChange} error helperText
         {...(errors.date && { error: true, helperText: errors.date })}   />
         <br /><br /><br />
         <br /><br />
        </div> 
        <Button style={smt} type="submit" color="primary" variant="contained">Submit</Button>
        </div>
        </form>
    );
}


const mapStateToProps = state => ({
    ToDoList: state.ToDo.list
})

const mapActionToProps = {
    createToDo: actions.create,
    updateToDo: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(ToDoForm);
