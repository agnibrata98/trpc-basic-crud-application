import { Todo } from '@prisma/client'
import React, { FormEvent, useState } from 'react'
import { TextField, Button, Box, Paper } from "@mui/material";
import { trpc } from '../../utils/trpc'

const AddTodo = () => {
    const [formData, setFormData] = useState<Todo>({
        id: 0,
        name: '',
        priority: ''
    })

    const utils = trpc.useContext()
    const addTodo = trpc.todo.addTodo.useMutation({
        onSuccess: () => {
            utils.todo.getTodos.invalidate()
        }
    })

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault()
        console.log(formData);
        if(formData.name === '' || formData.priority === '') {
            return alert('Please fill all the fields')
        }
        addTodo.mutate(formData)
        setFormData({
            id: 0,
            name: '',
            priority: ''
        })
    }
  return (
    // <form onSubmit={handleSubmit}>
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
    // </form>
    <Paper
      elevation={3}
      sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 4, borderRadius: 2 }}
    >
      <form
        onSubmit={handleSubmit}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Enter Todo"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Enter Priority"
            variant="outlined"
            fullWidth
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Add Todo
          </Button>
        </Box>
      </form>
    </Paper>
  )
}

export default AddTodo