import React, { useEffect} from 'react'
import '../App.css';
import {TextField,  Button, Grid, Paper } from '@material-ui/core';
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
        if (props.currentId !== 0){
            setValues({
                ...props.ToDoList.find(x => x._id === props.currentId)
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
        return Object.values(temp).every(x => x === "")
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
            if(props.currentId === 0)
            props.createToDo(values,onSuccess)
            else
            props.updateToDo(props.currentId,values,onSuccess)
        }
    }

    const paperStyle={padding :20,height:'280px',width:300, marginTop:"90px", marginRight:'300px'}
   
    return (
        <Grid align='center'>
        <Paper elevation={10} style={paperStyle}>
        <form autocomplete="off" id="myForm" noValidate onSubmit={handleSubmit}>
        <TextField 
        margin="normal"
        variant="outlined"
        name="todo"
        label="To Do"
        value={values.todo}
        onChange={handleInputChange}
        {...(errors.todo && { error: true, helperText: errors.todo })}
        /> 
        <br /><br /><br />    
        <input type="date"   name="date" placeholder="Select Date ->" value={values.date} onChange={handleInputChange} />
         <br /><br /><br />
        <Button  type="submit" size="large" color="primary" variant="contained">Submit</Button>
        </form>
        </Paper>
        </Grid>
        
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

 

 