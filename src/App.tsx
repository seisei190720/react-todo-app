import "./style/App.css";
// import './styles.css';
import React, { Suspense } from "react";
// import TodoAppBar from "./components/TodoAppBar";
import { DialogContent, createTheme } from "@mui/material";
import { grey, pink } from "@mui/material/colors";
import TodoList from "./components/todoList/TodoList";
import { RecoilRoot } from "recoil";
import TodoRegister from "./components/register/TodoRegister";

export const theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: pink[300],
    },
    text: {
      primary: grey[800],
      secondary: pink[300],
    },
    background: {
      paper: pink[300],
    },
  },
});

export default function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <DialogContent className="App">
          <TodoRegister />
          <TodoList />
        </DialogContent>
      </Suspense>
    </RecoilRoot>
  );
}
