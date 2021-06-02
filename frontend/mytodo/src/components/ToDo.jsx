import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/ToDo";
import { Grid, List, ListItem, ListItemText, Typography, Button  } from "@material-ui/core";
import ToDoForm from "./ToDoForm";
import ButterToast,{Cinnamon} from 'butter-toast';
import { DeleteSweep } from "@material-ui/icons";
 

const ToDo = ({classes, ...props}) => {
    const [currentId, setCurrentId]=useState(0)
    useEffect(() => {
        props.fetchAllToDo()
    }, [])//DidMount

    const onDelete = id => {
        const onSuccess = () =>{
            ButterToast.raise({
                content:<Cinnamon.Crisp title="Delete Box"
                    content="Deleted Successfully"
                    scheme = { Cinnamon.Crisp.SCHEME_PURPLE }
                    icon={<DeleteSweep />}
                />
            })
        }
        if(window.confirm("Are you sure to delete this record?"))
        props.deleteToDo(id)

    }

    return(
        <Grid container>
            <Grid item xs={6}>
                <ToDoForm {...{currentId,setCurrentId}} />
            </Grid>
            <Grid item xs={6}>
                <List>
                    {
                        props.ToDoList.map((record, index)=>{
                            return(
                              <Fragment key={index}>
                                <ListItem>
                                    <ListItemText>
                                        <Typography variant="h5" style={{ display:'flex',    marginLeft:'0px', marginTop:'5px'}}>
                                            {record.todo}
                                        </Typography>
                                        <Typography variant="h6"  style={{ display:'flex',  marginLeft:'400px',marginTop:'-33px'}}>
                                            {record.date.slice(0,10)}
                                        </Typography>
                                        <div>
                                            <Button style={{ display:'flex',   marginLeft:'730px', marginTop:'-27px'}}variant="contained" color="primary" size="small" onClick={()=>setCurrentId(record._id)}>Edit</Button>
                                        </div>
                                        <div>
                                            <Button style={{display:'flex',   marginLeft:'800px',marginTop:'-29px'}}variant="contained" color="secondary" size="small"
                                            onClick={()=>onDelete(record._id)}>Delete</Button>
                                        </div>
                                    </ListItemText>
                                </ListItem>
                              </Fragment>
                            )
                        })
                    }
                </List>
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
