import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/ToDo";
import { Grid, List, ListItem, ListItemText, Typography, Button, Paper  } from "@material-ui/core";
import ToDoForm from "./ToDoForm";
import {  Create, Delete } from "@material-ui/icons";
import '../App.css';
 
const ToDo = ({classes, ...props}) => {
	const [currentId, setCurrentId]=useState(0)
		useEffect(() => {
		     
				props.fetchAllToDo()
		}, [])//DidMount
		
		const onDelete = id => {
			const onSuccess = () =>{}
      if(window.confirm("Are you sure to delete this record?"))
			props.deleteToDo(id)
		}
      return(
        <Grid container>
            <Grid item xs={6}>
						  <ToDoForm {...{currentId,setCurrentId}} />
            </Grid>
            <Grid item xs={6}>
						  <ul style={{display:'flex',marginTop:'80px'}}>
							<li><h5>ToDo</h5></li>
							<li style={{marginLeft:'250px'}}><h5>Date</h5></li>
							<li style={{marginLeft:'150px'}}><b>Action</b></li>
						</ul>
						 <Paper style={{marginTop:'-30px'}}>
                <List style={{fontFamily: "'Roboto', sans-serif"}}>
								
                    { 
										  props.ToDoList.sort((a, b)=>a.date>b.date?1:-1).map((record, index)=>{
										   return(
                              <Fragment key={index}>
                                <ListItem>
                                    <ListItemText>
                                        <Typography variant="p" style={{ display:'flex',    marginLeft:'0px', marginTop:'-5px'}}>
                                            {record.todo}
                                        </Typography>
                                        <Typography variant="p"  style={{ display:'flex',  marginLeft:'300px',marginTop:'-25px'}}>
                                            {record.date.slice(0,10)}
                                        </Typography>
                                        <div>
                                            <Button style={{ display:'flex',   marginLeft:'450px', marginTop:'-24px'}}variant="contained" color="primary" size="small" onClick={()=>setCurrentId(record._id)}><Create filled /></Button>
                                        </div>
                                        <div>
                                            <Button style={{display:'flex',   marginLeft:'520px',marginTop:'-32px'}}variant="contained" color="secondary" size="small"
                                            onClick={()=>onDelete(record._id)}><Delete /></Button>
                                        </div>
                                    </ListItemText>
                                </ListItem>
                              </Fragment>
                            )
                        })
                    }
                </List>
							</Paper>
            </Grid>
        </Grid>
    );
}


const mapStateToProps = state => ({
    ToDoList: state.ToDo.list
})

const mapActionToProps = {
    fetchAllToDo: actions.fetchAll,
    deleteToDo: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(ToDo);
