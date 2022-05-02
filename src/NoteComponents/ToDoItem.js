

import { Accordion, AccordionActions, Button, TextareaAutosize, TextField } from "@mui/material"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Typography from "@mui/material/Typography"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Textarea from 'muicss/lib/react/textarea';

import { useEffect, useState } from "react";


//  title = ""
    // deadLine = ""
    // nodeDetails = ""

export const ToDoItem = (props) => {


  const [workInShort,setWorkTitle] = useState('')

  const [deadlineDate,setDeadLineDate] = useState(Date())

  const [workDetails,setWorkDetails] = useState('')

  const [noteCreatedAt,setNoteCreatedAt] = useState(Date());
  
  useEffect(() => {
    setNoteCreatedAt(Date())
    props.todoItem.noteCreatedAt = noteCreatedAt;
  })


  const updateDataFunction = () => {
    props.updateParentData()
  }


  const removeTodoList = () => {
    props.removeItem(props.index)
    updateDataFunction()
  }

  const onWorkDetailsChange = x => {
    const val = x.target.value;
    props.todoItem.noteDetails = val;
    setWorkDetails(val)
    updateDataFunction()

  }
  const onDeadLineDatechange = x => {
    props.todoItem.deadLine = Date(Date.parse(x))
    console.log(props)
    setDeadLineDate(x);
    updateDataFunction()
  }



  const onTitleChange = x => {
    const val = x.target.value;
    props.todoItem.title = val;
    setWorkTitle(val);
    
    updateDataFunction()
  }

    return (

        <Accordion className="todo-item">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{workInShort || 'Work title'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField variant="filled" 
          label="Todo Header" 
          className="todo__item__field"
          onChange={onTitleChange}></TextField>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Deadline"
          className="todo__item__field"
          value={deadlineDate}
          onChange={onDeadLineDatechange}
          renderInput={(params) => <TextField {...params} />}
        />


</LocalizationProvider>


        <Textarea className="todo__item__field todo__item__details__text__area" placeholder="Your TODO Details"  onChange={onWorkDetailsChange}></Textarea>
        </AccordionDetails>

        <AccordionActions>
        <Button variant="outlined" color="error" onClick={removeTodoList}>Remove Note</Button>
          </AccordionActions>
      </Accordion>
    )
}