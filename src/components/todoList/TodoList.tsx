import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  ThemeProvider,
} from "@mui/material/styles";
import TodoAccordion from "./TodoAccordion";
import { useRecoilState } from "recoil";
import { taskApiSelector } from "../../atoms/RegisterDialogContent";
import { theme } from "../../App";
import { todoData } from "../types";

export default function TodoList() {
  // const classes = useStyles();

  const [savedTask] = useRecoilState<todoData[]>(taskApiSelector);
  return (
    <>
      <Box padding="2rem" textAlign="center">
        {savedTask.length !== 0 ? (
          <>
            <ThemeProvider theme={theme}>
              <TodoAccordion />
            </ThemeProvider>
          </>
        ) : (
          <>
            <Typography variant="subtitle1" gutterBottom>
              まだ登録されたタスクはありません。
            </Typography>
          </>
        )}
      </Box>
    </>
  );
}
