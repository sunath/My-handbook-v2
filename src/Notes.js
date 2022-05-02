import { Button, Divider } from "@mui/material";
import "./Notes.css";

import React, { useEffect, useState } from "react";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from "@mui/material";
import { ToDoList } from "./NoteComponents/ToDoList";
import { Note } from "./NoteComponents/Note";
import { BucketList } from "./NoteComponents/BucketList";

import {
  writeUserDataToDatabase,
  get_user_data_on_topic
} from "./fire-database";
import { ToDoRender } from "./todo/ToDoRender";

export const NoteDataClassWhereToOptions = {
  TODO: "TODO",
  BUCKET_LIST: "BUCKET_LIST",
  PLAIN_NOTE: "PLAIN_NOTE"
};

export class NoteDataClass {
  whereTo = "";
  jsonData = "";
}

export const Notes = (props) => {
  // Menu Items for Create Type Selection
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleCreateFormMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [saveFunction, setSaveFunction] = useState(null);

  // Dialog State
  const [dialogState, setDialogState] = useState(false);

  // Save Data
  const [saveDataClass, setSaveDataClass] = useState(new NoteDataClass());

  // Previous Note Data
  const [noteFirebaseData, setFirebaseNoteData] = useState();

  // TODOLIST Firebase Data
  const [firebaseObserver, setFirebaseObserver] = useState();

  useEffect(() => {
    get_user_data_on_topic(NoteDataClassWhereToOptions.TODO, (e) => {
      const nextFirebaseData = e.val();
      if (nextFirebaseData !== noteFirebaseData) {
        setFirebaseNoteData(nextFirebaseData);
        console.log(nextFirebaseData);
      }
    });
  }, []);

  const get_data = () => {
    if (noteFirebaseData) {
      const keys = Object.keys(noteFirebaseData);
      return keys.map((e) => {
        return (
          <div key={e}>
            {noteFirebaseData[e].data.todoItems[0].title}
            {noteFirebaseData[e].data.todoItems[0].noteDetails}
            {noteFirebaseData[e].data.todoItems[0].noteCreatedAt}
          </div>
        );
      });
    }
    return <h1>HJel</h1>;
  };

  const closeDialog = () => {
    console.log(saveDataClass);
    if (saveFunction) {
      saveFunction();
    }

    writeUserDataToDatabase(saveDataClass);
    setDialogState(false);
    setNextFormType("");
    setNextForm(null);
  };

  const closeCancleDialog = () => {
    setDialogState("");
    setNextFormType("");
    setNextForm(null);
  };
  const openDialog = () => {
    setDialogState(true);
  };

  const setSaveDataClassFunction = (e) => {
    setSaveDataClass(e);
  };

  // Next Form State
  const [nextFormType, setNextFormType] = useState("");

  // Next Form Content
  const [nextForm, setNextForm] = useState(null);

  // const createNewForm = (e) => {
  //     console.log(e)
  // }

  const handleMenuCloseClick = (e) => {
    return () => {
      setAnchorEl(null);
      const saveDataString = JSON.stringify(saveDataClass);
      if (!e) return;

      if (e === "todo") {
        setNextFormType(" todo list");
        setNextForm(
          <ToDoList
            saveFunction={saveFunction}
            saveObjData={setSaveDataClassFunction}
          ></ToDoList>
        );
        setDialogState(true);
      } else if (e === "note") {
        setNextFormType(" Note");
        setNextForm(
          <Note saveFunction={saveFunction} saveData={saveDataString}></Note>
        );
        setDialogState(true);
      } else if (e === "bucket") {
        setNextFormType(" Bucket List");
        setNextForm(
          <BucketList
            saveFunction={saveFunction}
            saveData={saveDataString}
          ></BucketList>
        );
        setDialogState(true);
      }
    };
  };

  const getCurentDate = () => {
    const today = Date();
    const dayAndTimes = today.split(" ");
    return (
      dayAndTimes[0] +
      " " +
      dayAndTimes[1] +
      " " +
      dayAndTimes[2] +
      " " +
      dayAndTimes[3]
    );
  };

  return (
    <div className="notes">
      <Divider variant="middle"></Divider>
      <h1 className="title">
        What are you <span>gonna</span> do?
      </h1>
      <h3 className="current-date">{getCurentDate()}</h3>

      <Button
        variant="outlined"
        className="newFormCreator"
        onClick={handleCreateFormMenuClick}
      >
        Add a Form
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuCloseClick("")}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        <MenuItem onClick={handleMenuCloseClick("todo")}>Todo List</MenuItem>
        <MenuItem onClick={handleMenuCloseClick("note")}>Note</MenuItem>
        <MenuItem onClick={handleMenuCloseClick("bucket")}>
          Bucket List
        </MenuItem>
      </Menu>

      {/* 

                Forms are gonna appear right here in a dialog

            */}

      <Dialog open={dialogState}>
        {/* <DialogTitle>Create a {nextFormType}</DialogTitle> */}
        <DialogContent>{nextForm}</DialogContent>
        <DialogActions>
          <Button onClick={closeCancleDialog} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={closeDialog} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* {get_data()} */}

      <ToDoRender data={noteFirebaseData}></ToDoRender>
    </div>
  );
};
