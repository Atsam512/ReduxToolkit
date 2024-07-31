import { useState, useRef, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, editTodo } from "./features/todo/todoslice";

function App() {
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef(null);

  const stateVal = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (value.trim()) {
      dispatch(addTodo(value));
      setValue("");
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleEditTodo = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  const handleSaveEdit = (id) => {
    if (editValue.trim()) {
      dispatch(editTodo({ id: id, newText: editValue }));
      setEditId(null);
      setEditValue("");
    }
  };

  useEffect(() => {
    if (editId !== null) {
      inputRef.current.focus();
    }
  }, [editId]);

  return (
    <>
      <p>Redux -- Redux Toolkit and React Redux</p>
      <input
        name="value"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleAddTodo}>Add Todo</button> &nbsp;&nbsp;&nbsp;
      <button onClick={() => handleRemoveTodo(value)}>Remove Todo</button>
      <br />
      <br />
      <ul>
        {stateVal.map((val) => (
          <li key={val.id}>
            {editId === val.id ? (
              <>
                <input
                  ref={inputRef}
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(val.id)}>Save</button>
              </>
            ) : (
              <>
                Name: {val.text} &nbsp;&nbsp;&nbsp;
                <span onClick={() => handleEditTodo(val.id, val.text)}>
                  Edit
                </span>
                &nbsp;&nbsp;&nbsp;
                <span onClick={() => handleRemoveTodo(val.id)}>Remove</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
