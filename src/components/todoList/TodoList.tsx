import React from "react";
import Box from "@mui/material/Box";
import TodoAccordion from "./accordion/TodoAccordion";
import TodoTabBar from "../tabbar/TodoTabBar";
import { Stack } from "@mui/material";

export default function TodoList() {
  return (
    <>
      <Box padding="1rem" textAlign="center">
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <TodoTabBar />
            <Stack>
              <TodoAccordion />
            </Stack>
          </Stack>
      </Box>
    </>
  );
}
