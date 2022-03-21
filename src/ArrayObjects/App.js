import React,{useState} from 'react'
import faker from 'faker'// npm i ember-faker
//npm i casual

const App = () => {
    const[users, setUsers] = useState([]); 

    const handleAddUser = () => {
        const newUser = {  
            name: faker.name.firstName(),
            identity: faker.random.uuid(),
        }
        setUsers([...users, newUser])
    }

    const  handleRemoveUser = (pIdentity) => {
        const newUsers= users.filter((pI) => (
            pI.identity !== pIdentity
        ))
        setUsers(newUsers)
    }

    const handleUpdateUser = (pIdentify) =>{
        const aUsersAlter = users.map((elm) => {
            if (elm.identity === pIdentify) {
                return {
                    ...elm,
                    name: faker.name.firstName(),
                }
            }
            return elm
        })
        setUsers(aUsersAlter)
    };

  return (
    <div>
        <ul>
            {users.map((pI,i) => (
                    <div key={pI.identity}>
                        <li 
                            onClick={() => {handleUpdateUser(pI.identity)}}
                        >{pI.name}
                        </li>      

                        <button type='button'
                            onClick={() => {handleRemoveUser(pI.identity)}}
                        >X</button>
                    </div>
            ))}
        </ul>
        <button onClick={handleAddUser}>Agregar Random</button>
    </div>
  )
}

export default App
/* 
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
*/