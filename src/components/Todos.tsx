import React from 'react'
import { trpc } from '../../utils/trpc';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';

const Todos = () => {
  const router = useRouter();
    const {data: allTodo, isPending} = trpc.todo.getTodos.useQuery();
    // console.log(allTodo);

    const utils = trpc.useContext()
    const deleteTodo = trpc.todo.deleteTodo.useMutation({
      onSuccess: () => {
        utils.todo.getTodos.invalidate()
      }
    })

    const handleDelete = (id: number) => {
      deleteTodo.mutate({id})
    }

    if(isPending) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
    )
    }
  return (
    // <div>
    //     <h2>All Todo</h2>
    //     {isPending && <p>Loading...</p>}
    //     {
    //     allTodo?.map((todo) => (
    //       <div key={todo.id}>
    //         <h1>{todo.name}</h1>
    //         <h2>{todo.priority}</h2>
    //         <button onClick={()=>router.push(`/todo/${todo.id}`)}>View Todo</button>
    //         <button onClick={()=>handleDelete(todo.id)}>Delete</button>
    //       </div>
    //     ))
    //   }
    // </div>

    <div>
      <Typography variant="h4" gutterBottom>
        All Todos
      </Typography>

      {isPending && <CircularProgress />}

      <Grid container spacing={3}>
        {allTodo?.map((todo) => (
          <Grid item xs={12} sm={6} md={4} key={todo.id}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {todo?.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Priority: {todo?.priority}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mt: 2, mr: 1 }}
                  onClick={() => router.push(`/todo/${todo.id}`)}
                >
                  View Todo
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Todos