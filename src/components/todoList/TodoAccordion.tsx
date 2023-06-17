import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import {
  taskApiSelector,
  taskCacheAtom,
  deleteTodo,
  updateDone,
  updateTillToday,
} from "../../atoms/RegisterDialogContent";
import { LOW_PRIORITY, TOP_PRIORITY, todoData } from "../types";
import DoneTable from "./table/DoneTable";
import UndoneTable from "./table/UndoneTable";
import React from "react";

export default function TodoTable() {
  //taskApiSelectorのsetterには、taskCacheAtomに値をセットする関数が定義されている
  const [savedTask, store] = useRecoilState<todoData[]>(taskApiSelector);
  const [cachedTask, setCachedTask] = useRecoilState(taskCacheAtom);
  const updatedToUpperRowRef = useRef<HTMLTableRowElement[]>([]);
  const updatedToLowerRowRef = useRef<HTMLTableRowElement[]>([]);
  const updatedToUndoneRowRef = useRef<HTMLTableRowElement[]>([]);
  // const dispatch = useDispatch();
  const TO_TILL_TODAY = 1;
  const TO_TILL_AFTER_TOMORROW = 0;
  const TO_DONE = 1;
  const TO_UNDONE = 0;

  useEffect(() => {
    store(savedTask); // 初回fetchで返った値をselectorに保存する
  }, [savedTask, store]);

  //doneゾーンに移動させる
  const handleDone = async (todoId: string) => {
    const updatedTask: todoData[] = await updateDone(todoId, TO_DONE);
    await setCachedTask(updatedTask);

    const doneTaskLength = cachedTask?.filter((v) => v.done === 1).length;
    highlightMovedRow(doneTaskLength, updatedToUndoneRowRef);
  };

  //doneゾーンから戻す(LowPriorityへ)
  const handleUndone = async (todoId: string) => {
    const updatedTask: todoData[] = await updateDone(todoId, TO_UNDONE);
    await setCachedTask(updatedTask);

    const undoneTaskLength = cachedTask?.filter(
      (v) => v.done === 0 && v.till_today === 0
    ).length;
    highlightMovedRow(undoneTaskLength, updatedToLowerRowRef);
  };

  //TopPriorityゾーンに移動させる
  const handleUpper = async (todoId: string) => {
    const updatedTask: todoData[] = await updateTillToday(
      todoId,
      TO_TILL_TODAY
    );
    await setCachedTask(updatedTask);

    const upperTaskLength = cachedTask?.filter(
      (v) => v.done === 0 && v.till_today === 1
    ).length;
    highlightMovedRow(upperTaskLength, updatedToUpperRowRef);
  };

  //LowPriorityゾーンに移動させる
  const handleLower = async (todoId: string) => {
    const updatedTask: todoData[] = await updateTillToday(
      todoId,
      TO_TILL_AFTER_TOMORROW
    );
    await setCachedTask(updatedTask);

    const lowerTaskLength = cachedTask?.filter(
      (v) => v.done === 0 && v.till_today === 0
    ).length;
    highlightMovedRow(lowerTaskLength, updatedToLowerRowRef);
  };

  const highlightMovedRow = (
    filteredTaskLength: number | undefined,
    rowRef: React.MutableRefObject<HTMLTableRowElement[]>
  ) => {
    if (filteredTaskLength === undefined) return;
    const tableRow = rowRef.current[filteredTaskLength];
    if (tableRow) {
      tableRow.style.backgroundColor = "gray";
      setTimeout(() => {
        tableRow.style.backgroundColor = "";
      }, 2000);
    }
  };

  // 選択したタスクを消去する
  const handleDelete = (todoId: string) => {
    if (cachedTask === null) return;
    setCachedTask(cachedTask?.filter((v) => v.id !== todoId));
    deleteTodo(todoId);
  };

  return (
    <>
      <Accordion style={{ outline: "solid", backgroundColor: "#212121" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            color={"#fff59d"}
            fontWeight={"lighter"}
          >
            TOP PRIORITY
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <UndoneTable
              priorityZone={TOP_PRIORITY}
              filteredTask={cachedTask?.filter(
                (value) => value.done === 0 && value.till_today === 1
              )}
              handleMove={handleLower}
              handleDone={handleDone}
              handleDelete={handleDelete}
              rowRef={updatedToUpperRowRef}
              // checkBoxCellRef={checkBoxCellRef}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ outline: "solid", backgroundColor: "#212121" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            color={"#69f0ae"}
          >
            LOW PRIORITY
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <UndoneTable
              priorityZone={LOW_PRIORITY}
              filteredTask={cachedTask?.filter(
                (value) => value.done === 0 && value.till_today === 0
              )}
              handleMove={handleUpper}
              handleDone={handleDone}
              handleDelete={handleDelete}
              rowRef={updatedToLowerRowRef}
              // checkBoxCellRef={checkBoxCellRef}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ outline: "solid", backgroundColor: "#212121" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            color={"#80d8ff"}
          >
            DONE
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <DoneTable
              filteredTask={cachedTask?.filter((value) => value.done === 1)}
              handleUndone={handleUndone}
              handleDelete={handleDelete}
              rowRef={updatedToUndoneRowRef}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
