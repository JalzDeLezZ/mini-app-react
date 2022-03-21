import { Card, Typography,CardContent, Button } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const TaskList = () => {
  const navigation = useNavigate();
  const [tasks, setTasks] = useState([])

  const loadTasks = async () => {
    const response = await fetch('http://localhost:4000/tasks')
    const data = await response.json()
    setTasks(data)
  }
  const handleDelete = async (pId) => {
    const res =  await fetch (`http://localhost:4000/tasks/${pId}`,{
      method: "DELETE"
    })
    console.log(res)
    let updateArray = tasks.filter(element => element.id !== pId)
    setTasks(updateArray)
  }
  useEffect(() => {
    loadTasks()
  },[]);

  return (
    <>
      <h1>Task List</h1>
      {/* <span>{JSON.stringify(tasks)}</span> */}
      {/* <span>{JSON.stringify(tasks[0])}</span> */}
       {
          tasks.map((pI, i) => (
            <Card key={i} style={{marginBottom: ".7rem", backgroundColor:"#1e272e"}}>
              <CardContent style={{display: "flex", justifyContent:"space-between"}}>
                <div style={{color : 'white'}}>
                  <Typography>{pI.title}</Typography>
                  <Typography>{pI.description}</Typography>
                </div>
                <div>

                <Button 
                  variant='contained' 
                  color= 'inherit' 
                  onClick={() => navigation(`/task/${pI.id}/edit`)}
                >EDIT</Button>
                <Button 
                  variant='contained' 
                  color= 'warning' 
                  onClick={() => {handleDelete(pI.id)}}
                  style={{marginLeft: ".5rem"}}
                >DELETE</Button>
                </div>
              </CardContent>
            </Card>
          ))
        }
    </>
  )
}

export default TaskList

{/* <Card>
            <CardContent>
              <Typography>elm.title</Typography>
              <Typography>elm.description</Typography>
            </CardContent>
          </Card> */}