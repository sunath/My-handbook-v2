import { app, auth, User } from "./firebase";
import {
  getDatabase,
  ref,
  db,
  push,
  set,
  onValue,
  update,
  remove
} from "firebase/database";
import { NoteDataClass } from "./Notes";

const database = getDatabase();

export const writeUserDataToDatabase = (data) => {
  const user_id = User.getCurrentUserID();
  const path = data.whereTo;
  const note_data = data.jsonData;

  const postListRef = ref(database, path + "/" + user_id);
  const newPostRef = push(postListRef);
  set(newPostRef, {
    data: note_data
  });
};

export const get_user_data_on_topic = (type, set_data_function) => {
  const user_id = User.getCurrentUserID();
  const path = type + "/" + user_id;
  const dbRef = ref(database, path);
  onValue(dbRef, set_data_function);
};

export const update_user_todo_item_finish = (key, index, isFinished) => {
  const updates = {};
  const current_user = User.getCurrentUserID();
  const path =
    `TODO/${current_user}/` + key + `/data/todoItems/${index}/isFinished`;
  console.log(path);
  updates[path] = isFinished;
  update(ref(database), updates);
};

export const update_user_todo_items_all = (key, length, state) => {
  const updates = {};

  const current_user = User.getCurrentUserID();

  const list = new Array(length).fill(1);

  for (let i = 0; i < list.length; i++) {
    const path =
      `TODO/${current_user}/` + key + `/data/todoItems/${i}/isFinished`;
    updates[path] = state;
  }

  console.log(updates);

  update(ref(database), updates);
};

export const removeTodoList = (todoItemsPath) => {
  const user_id = User.getCurrentUserID();

  const path = "TODO/" + user_id + "/" + todoItemsPath;
  const itemRef = ref(database, path);
  remove(itemRef);
};
