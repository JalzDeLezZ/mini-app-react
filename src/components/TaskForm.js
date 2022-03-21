import { Button, Card, CardContent, Grid, TextField, Typography, CircularProgress } from '@mui/material'
import React,{useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const TaskForm = () => {

  const navigation = useNavigate();
  const paramsUrl = useParams();

  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const [loading, setLoading] = useState(false)
  const [editation, setEditation] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if(editation){
      console.log("Update")
      const response = await fetch(`http://localhost:4000/tasks/${paramsUrl.id}`,{
        method: "PUT", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
      })
    }
    else{

      // const res = await fetch('http://localhost:4000/tasks',{
      await fetch('http://localhost:4000/tasks',{
        method: 'POST',
        body: JSON.stringify(task),
        headers: {'Content-Type': 'application/json'}
      });
      // const data = await res.json();
      // console.log(data);
    }

    setLoading(false)
    navigation('/');
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setTask({...task, [name]: value})
    console.log(name, value)
  }

  const reloadTask = async (pId) => {
    const res = await fetch(`http://localhost:4000/tasks/${pId}`);
    const data = await res.json();
    // console.log("=>>>>>>>><",data.Sussesfully[0]);
    setTask({title:data.title, description: data.description})
    setEditation(true)
  }

  useEffect(() => {
    const {id} = paramsUrl
    console.log(id)
    if(id){
      console.log("fetch task")
      reloadTask(id)
    }
  },[paramsUrl.id])

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
        <Grid item xs={3}>
            <Card
              sx={{mt: 5}}
              style={{
                backgroundColor: "#1e272e",
                padding: '1rem'
              }}
            >
            <Typography variant='5' textAlign="center" color='white'>
              {
                editation ? "Edit Task" : "Create Task"
              }
            </Typography>  
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant='filled'
                  label='Write your title'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  inputProps={{style:{color:"white"}}}
                  InputLabelProps={{style: {color: "white"}}}
                  name= 'title'
                  onChange={handleChange}
                  value= {task.title}
                />

                <TextField
                  variant='filled'
                  label='Write your description'
                  multinine="true"
                  rows={4}
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  inputProps={{style:{color:"white"}}}
                  InputLabelProps={{style: {color: "white"}}}
                  name= 'description'
                  onChange={handleChange}
                  value= {task.description}
                />
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled= {!task.title || !task.description}
                >
                  {
                    loading ? (<CircularProgress color= 'inherit' size={24}/>)
                    : editation ? "Edit"
                    : "Create"
                  }
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
    </Grid>
  )
}

export default TaskForm