import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: 1, text: "Hello Shami" }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid,
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      let res = state.todos.filter((val) => val.id !== action.payload);
      state.todos = res;
    },
    editTodo: (state, action) => {
      let res = state.todos.find((val) => val.id === action.payload);
      if (res) {
        res.todo = action.payload;
      }

      const { id, newText } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    },
  },
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
