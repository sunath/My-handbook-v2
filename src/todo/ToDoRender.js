import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Button,
  Typography
} from "@mui/material";
import React, { useEffect } from "react";

import ListAltIcon from "@mui/icons-material/ListAlt";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  update_user_todo_item_finish,
  update_user_todo_items_all,
  removeTodoList
} from "../fire-database";

import "./ToDoRender.css";

export const ToDoRender = (props) => {
  const keysOfListRender = () => {
    if (!props.data) return [];
    return Object.keys(props.data) || [];
  };

  return (
    <div>
      {/* {JSON.stringify(props)} */}

      {/* {keysOfListRender()} */}

      <div className="todo__list__header">
        <h1>TODO</h1>
        <span>ITEMS</span>
      </div>

      <ToDoListRender
        keys={keysOfListRender()}
        data={props.data}
      ></ToDoListRender>
    </div>
  );
};

export const ToDoListRender = (props) => {
  return (
    <div>
      {props.data && props.keys ? (
        <div>
          {props.keys.map((e) => (
            <ToDoListItemRender
              key={e}
              nodeId={e}
              className="todo__item__render"
              data={props.data[e].data}
            />
          ))}
        </div>
      ) : (
        <div>
          <h2>No todos found....</h2>
        </div>
      )}
    </div>
  );
};

export const ToDoListItemRender = (props) => {
  const todoItems = () => {
    return props.data.todoItems || [];
  };

  const get_all_todos_done_or_not = () => {
    return props.data.todoItems
      ? props.data.todoItems.map((e) => e.isFinished).filter((e) => e === true)
          .length === props.data.todoItems.length
      : false;
  };

  const mark_all_todos_done = () => {
    const length = props.data.todoItems.length;
    const key = props.nodeId;
    update_user_todo_items_all(key, length, true);
  };

  const undo_all_todos = () => {
    const length = props.data.todoItems.length;
    const key = props.nodeId;
    update_user_todo_items_all(key, length, false);
  };

  const remove_all_todoItems = () => {
    removeTodoList(props.nodeId);
  };
  return (
    <div className="">
      {/* {JSON.stringify(props)} */}

      <Accordion>
        <AccordionSummary>
          {get_all_todos_done_or_not() ? (
            <del>
              <Typography variant="h5">{props.data.todoTitle}</Typography>
            </del>
          ) : (
            <Typography variant="h5">{props.data.todoTitle}</Typography>
          )}
        </AccordionSummary>

        <AccordionDetails>
          {todoItems().map((e, i) => (
            <ToDoItemRender
              key={props.nodeId + " " + i}
              nodeId={props.nodeId + " " + i}
              itemID={i}
              data={e}
            ></ToDoItemRender>
          ))}
        </AccordionDetails>

        <AccordionActions>
          <Button
            variant="outlined"
            color="success"
            onClick={remove_all_todoItems}
            disabled={!get_all_todos_done_or_not()}
          >
            Clear this one
          </Button>

          {!get_all_todos_done_or_not() ? (
            <Button onClick={mark_all_todos_done} variant="contained">
              Mark al done
            </Button>
          ) : (
            <Button
              onClick={undo_all_todos}
              variant="contained"
              color="secondary"
            >
              Undo all
            </Button>
          )}
        </AccordionActions>
      </Accordion>
    </div>
  );
};

export const ToDoItemRender = (props) => {
  const extract_date_from_user_data = () => {
    let array = new Array(4);
    array.fill(1);
    const parts = props.data.deadLine.split(" ");
    return array.map((_, i) => parts[i]).reduce((p, n) => " " + p + " " + n);
  };

  const markIt = () => {
    const [key, index] = props.nodeId.split(" ");
    update_user_todo_item_finish(key, index, true);
  };

  const unmarkIt = () => {
    const [key, index] = props.nodeId.split(" ");
    update_user_todo_item_finish(key, index, false);
  };

  const classNamesForContentText = () => {
    return props.data.isFinished ? "todo__item__finished__text" : "";
  };

  return (
    <Accordion>
      <AccordionSummary>
        {props.data.isFinished ? (
          <del>
            <Typography variant="h6">
              {props.data.title}
              <span className="todo__item__deadline">
                {extract_date_from_user_data()}
              </span>
            </Typography>
          </del>
        ) : (
          <Typography variant="h6">
            {props.data.title}
            <span className="todo__item__deadline">
              {extract_date_from_user_data()}
            </span>
          </Typography>
        )}
      </AccordionSummary>

      <AccordionDetails>
        {/* {JSON.stringify(props)} */}

        {props.data.isFinished ? (
          <del>
            <p> {props.data.noteDetails}</p>
          </del>
        ) : (
          <p> {props.data.noteDetails}</p>
        )}
      </AccordionDetails>

      <AccordionActions>
        <Button
          variant="contained"
          color="error"
          disabled={!props.data.isFinished}
          onClick={unmarkIt}
        >
          Unmark
        </Button>
        <Button
          variant="contained"
          disabled={props.data.isFinished}
          onClick={markIt}
        >
          Mark It
        </Button>
      </AccordionActions>
    </Accordion>
  );
};
