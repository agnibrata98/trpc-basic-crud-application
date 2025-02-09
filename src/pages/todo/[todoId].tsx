import { useRouter } from 'next/router'
import React, { FormEvent, useState } from 'react'
import { trpc } from '../../../utils/trpc'
import { Todo } from '@prisma/client'
import { Box, Button, Card, CardContent, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material'

const SingleTodoPage = () => {
    const [formData, setFormData] = useState<Todo>({
            id: 0,
            name: '',
            priority: ''
    })
    const router = useRouter()
    // const {id} = router.query
    // Ensure id is a string before parsing
    const id = parseInt(router.query.todoId as string);
    // console.log(id);
    const {data, isPending} = trpc.todo.getSingleTodo.useQuery({id})
    // console.log(data);

    // for invalidate the query
    const utils = trpc.useContext()

    // mutation to update todo
        const updateTodo = trpc.todo.updateTodo.useMutation({
            onSuccess: () => {
                utils.todo.getSingleTodo.invalidate()
            }
        })
    
        const handleSubmit = (e : FormEvent) => {
            e.preventDefault()
            // console.log(formData);
            if(formData.name === '' || formData.priority === '') {
                return alert('Please fill all the fields')
            }
            updateTodo.mutate({
                id,
                name: formData.name,
                priority: formData.priority
            })
            setFormData({
                id: 0,
                name: '',
                priority: ''
            })
        }
  return (
    // <div>
    //     {/* <h1>Todo Name: {data?.name}</h1>
    //     <h2>Todo Priority: {data?.priority}</h2> */}
    //     <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
    //         <CardContent>
    //         <Typography variant="h5" component="div">
    //             {data?.name}
    //         </Typography>
    //         <Typography variant="subtitle1" color="textSecondary">
    //             Priority: {data?.priority}
    //         </Typography>
    //         </CardContent>
    //     </Card>
    //     {/* <form onSubmit={handleSubmit}>
    //     <input 
    //         type="text" 
    //         placeholder='Enter Todo'
    //         value={formData.name}
    //         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    //     />
    //     <input 
    //         type="text" 
    //         placeholder='Enter Priority' 
    //         value={formData.priority}
    //         onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
    //     />
    //     <button>Add Todo</button>
    // </form> */}
    // <Paper
    //   elevation={3}
    //   sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 4, borderRadius: 2 }}
    // >
    //     <form
    //     onSubmit={handleSubmit}
    //   >
    //     <Box display="flex" flexDirection="column" gap={2}>
    //       <TextField
    //         label="Enter Todo"
    //         variant="outlined"
    //         fullWidth
    //         value={formData.name}
    //         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    //       />
    //       <TextField
    //         label="Enter Priority"
    //         variant="outlined"
    //         fullWidth
    //         value={formData.priority}
    //         onChange={(e) =>
    //           setFormData({ ...formData, priority: e.target.value })
    //         }
    //       />
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         type="submit"
    //         fullWidth
    //       >
    //         Update Todo
    //       </Button>
    //     </Box>
    //     </form>
    // </Paper>
    // </div>

    <Box sx={{ p: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        {
            isPending ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
            <Grid item xs={12} sm={8} md={6}>
                <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
                    <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        {data?.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Priority: {data?.priority}
                    </Typography>
                    </CardContent>
                </Card>
            </Grid>
            )
        }
        {/* Todo Details Card */}

        {/* Update Todo Form */}
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Update Todo
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Todo Name"
                  variant="outlined"
                  fullWidth
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <TextField
                  label="Priority"
                  variant="outlined"
                  fullWidth
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Update Todo
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SingleTodoPage