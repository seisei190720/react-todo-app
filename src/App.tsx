import "./style/App.css";
import React, { Suspense } from "react";
import { DialogContent, ThemeProvider } from "@mui/material";
import TodoList from "./components/todoList/TodoList";
import { RecoilRoot } from "recoil";
import TodoRegister from "./components/register/TodoRegister";
import { theme } from "./style/styleTheme";

export default function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <DialogContent className="App">
          <ThemeProvider theme={theme}>
            <TodoRegister />
            <TodoList />
          </ThemeProvider>
        </DialogContent>
      </Suspense>
    </RecoilRoot>
  );
}

