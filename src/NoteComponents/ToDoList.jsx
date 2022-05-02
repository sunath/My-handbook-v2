import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { NoteDataClass } from "../Notes";
import { ToDoItem } from "./ToDoItem";

import "./ToDoList.css";

import { NoteDataClassWhereToOptions } from "../Notes";

export class ToDoListItemData {
  noteCreatedAt = undefined;
  title = "";
  deadLine = "";
  noteDetails = "";
  isFinished = false;
}

export const ToDoList = (props) => {
  const [todoListTitile, setToDoListTitle] = useState("");

  const [todoItems, setToDoItems] = useState([]);

  const [todoItemsCompoents, setTodosItemsCompoent] = useState([]);

  const updateSaveDataClass = () => {
    const newClass = new NoteDataClass();
    newClass.whereTo = NoteDataClassWhereToOptions.TODO;

    newClass.jsonData = {
      todoItems: todoItems,
      todoTitle: todoListTitile
    };

    props.saveObjData(newClass);
  };

  const getTodoItemcomponents = () => {
    return todoItems.map((e, i) => (
      <ToDoItem
        key={i}
        todoItem={e}
        index={i}
        removeItem={removeToDoListItem}
        updateParentData={updateSaveDataClass}
      ></ToDoItem>
    ));
  };

  const addToDoItem = () => {
    const temp = todoItems;
    temp.push(new ToDoListItemData());
    setToDoItems(temp);
    setTodosItemsCompoent(getTodoItemcomponents());
    updateSaveDataClass();
  };

  const removeToDoListItem = (index) => {
    const temp = todoItems;
    temp.splice(index, 1);
    console.log(temp);
    setToDoItems(temp);
    setTodosItemsCompoent(getTodoItemcomponents());
    updateSaveDataClass();
  };

  const onTitleChange = (e) => {
    setToDoListTitle(e.target.value);
    updateSaveDataClass();
  };

  const dataToJson = () => {
    console.log(JSON.stringify(props.saveData));
  };

  return (
    <div
      style={{
        width: "min(30em,1500px)"
      }}
    >
      <h3>{todoListTitile || "Uknwon ToDo List"}</h3>

      <TextField
        label="Todo List Title"
        className="title-name"
        onChange={onTitleChange}
      ></TextField>

      <div className="todos">
        <h4 className="todos__todo-title">Todos</h4>

        <Button
          variant="contained"
          className="add-todo-item-btn"
          onClick={addToDoItem}
        >
          Add New Todo Item
        </Button>

        <div className="todos-each">
          {todoItemsCompoents}

          <Button onClick={dataToJson}>Add</Button>
        </div>
      </div>
    </div>
  );
};
