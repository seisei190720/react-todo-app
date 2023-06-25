import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import {
  taskApiSelector,
  taskCacheAtom,
  deleteTodo,
  updateDone,
  updateTillToday,
} from "../../../atoms/useTaskApi";
import { LOW_PRIORITY, TOP_PRIORITY, todoData } from "../../types";
import DoneTable from "./table/DoneTable";
import UndoneTable from "./table/UndoneTable";
import React from "react";
import yellow from "@mui/material/colors/yellow";
import green from "@mui/material/colors/green";
import { lightBlue } from "@mui/material/colors";
import { useGroupTask } from "./hooks/useGroupTask";
import {
  UseDoneTargetIndex,
  UseHigherTargetIndex,
  UseLowerTargetIndex,
} from "./hooks/useHighLightRow";
import { selectedTabAtom } from "../../../atoms/useTabApi";
import { snacBarOpenAtom, userInfoCacheAtom } from "../../../atoms/useUserInfo";

export default function TodoAccordion() {
  const [cachedUserInfo] = useRecoilState(userInfoCacheAtom);
  const [snacBarOpen, setSnacBarOpen] = useRecoilState(snacBarOpenAtom);
  const [savedTask, store] = useRecoilState<todoData[]>(taskApiSelector);
  const [cachedTask, setCachedTask] = useRecoilState(taskCacheAtom);
  const updatedToUpperRowRef = useRef<HTMLTableRowElement[]>([]);
  const updatedToLowerRowRef = useRef<HTMLTableRowElement[]>([]);
  const updatedToUndoneRowRef = useRef<HTMLTableRowElement[]>([]);
  const [selectedTab] = useRecoilState(selectedTabAtom);
  const groupedTask = useGroupTask(cachedTask, selectedTab);

  const [isTopAccordionOpen, setTopAccordionOpen] = useState<boolean>(false);
  const [isLowAccordionOpen, setLowAccordionOpen] = useState<boolean>(false);
  const [isDoneAccordionOpen, setDoneAccordionOpen] = useState<boolean>(false);
  // const [snacBarOpen, setSnacBarOpen] = useState<boolean>(false);

  const TO_TILL_TODAY = 1;
  const TO_TILL_AFTER_TOMORROW = 0;
  const TO_DONE = 1;
  const TO_UNDONE = 0;

  useEffect(() => {
    store(savedTask); // 初回fetchで返った値をselectorに保存する
  }, [cachedUserInfo, savedTask, store]);

  //タブ切り替え時に、taskが存在するアコーディオンを自動で開閉する
  useEffect(() => {
    setTopAccordionOpen(groupedTask.tillTodayTask.length === 0 ? false : true);
    setLowAccordionOpen(
      groupedTask.tillAfterTomorrowTask.length === 0 ? false : true
    );
    setDoneAccordionOpen(false);
  }, [selectedTab]);

  //doneゾーンに移動させる
  const handleDone = async (todoId: string) => {
    if (!cachedUserInfo) return;
    const updatedTask: todoData[] = await updateDone(
      todoId,
      TO_DONE,
      cachedUserInfo.sub
    );
    await setCachedTask(updatedTask);
    setSnacBarOpen(true);
    UseDoneTargetIndex(updatedTask, todoId, selectedTab, updatedToUndoneRowRef);
  };

  //doneゾーンから戻す(LowPriorityへ)
  const handleUndone = async (todoId: string) => {
    if (!cachedUserInfo) return;
    const updatedTask: todoData[] = await updateDone(
      todoId,
      TO_UNDONE,
      cachedUserInfo.sub
    );
    await setCachedTask(updatedTask);
    setSnacBarOpen(true);
    UseLowerTargetIndex(updatedTask, todoId, selectedTab, updatedToLowerRowRef);
  };

  //TopPriorityゾーンに移動させる
  const handleUpper = async (todoId: string) => {
    if (!cachedUserInfo) return;
    const updatedTask: todoData[] = await updateTillToday(
      todoId,
      TO_TILL_TODAY,
      cachedUserInfo.sub
    );
    await setCachedTask(updatedTask);
    UseHigherTargetIndex(
      updatedTask,
      todoId,
      selectedTab,
      updatedToUpperRowRef
    );
  };

  //LowPriorityゾーンに移動させる
  const handleLower = async (todoId: string) => {
    if (!cachedUserInfo) return;
    const updatedTask: todoData[] = await updateTillToday(
      todoId,
      TO_TILL_AFTER_TOMORROW,
      cachedUserInfo.sub
    );
    await setCachedTask(updatedTask);
    UseLowerTargetIndex(updatedTask, todoId, selectedTab, updatedToLowerRowRef);
  };

  // 選択したタスクを消去する
  const handleDelete = (todoId: string) => {
    if (cachedTask === null) return;
    setCachedTask(cachedTask?.filter((v) => v.id !== todoId));
    deleteTodo(todoId);
    setSnacBarOpen(true);
  };

  return (
    <>
      <Accordion expanded={isTopAccordionOpen} style={{ outline: "solid" }}>
        <AccordionSummary
          onClick={() => {
            setTopAccordionOpen(!isTopAccordionOpen);
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            color={yellow[300]}
          >
            {`TOP PRIORITY (${groupedTask.tillTodayTask.length})`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <UndoneTable
              priorityZone={TOP_PRIORITY}
              filteredTask={groupedTask.tillTodayTask}
              handleMove={handleLower}
              handleDone={handleDone}
              handleDelete={handleDelete}
              rowRef={updatedToUpperRowRef}
              // checkBoxCellRef={checkBoxCellRef}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={isLowAccordionOpen} style={{ outline: "solid" }}>
        <AccordionSummary
          onClick={() => {
            setLowAccordionOpen(!isLowAccordionOpen);
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            color={green[300]}
          >
            {`LOW PRIORITY (${groupedTask.tillAfterTomorrowTask.length})`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <UndoneTable
              priorityZone={LOW_PRIORITY}
              filteredTask={groupedTask.tillAfterTomorrowTask}
              handleMove={handleUpper}
              handleDone={handleDone}
              handleDelete={handleDelete}
              rowRef={updatedToLowerRowRef}
              // checkBoxCellRef={checkBoxCellRef}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={isDoneAccordionOpen} style={{ outline: "solid" }}>
        <AccordionSummary
          onClick={() => {
            setDoneAccordionOpen(!isDoneAccordionOpen);
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            color={lightBlue[300]}
          >
            {`DONE (${groupedTask.doneTask.length})`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <DoneTable
              filteredTask={groupedTask.doneTask}
              handleUndone={handleUndone}
              handleDelete={handleDelete}
              rowRef={updatedToUndoneRowRef}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Snackbar
        open={snacBarOpen}
        autoHideDuration={4000}
        onClose={() => setSnacBarOpen(false)}
      >
        <Alert onClose={() => setSnacBarOpen(false)} sx={{ width: "100%", fontWeight: 'bold' }}>
          {`Successfully updated!`}
        </Alert>
      </Snackbar>
    </>
  );
}
