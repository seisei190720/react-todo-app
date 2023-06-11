import { FC, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import VerticalAlignTopSharpIcon from "@mui/icons-material/VerticalAlignTopSharp";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { TOP_PRIORITY, todoData } from "../../types";
import React from "react";
import CircularStatic from "./assets/CircularStatic";

type Props = {
  priorityZone: string;
  filteredTask: todoData[] | undefined;
  handleMove: (todoId: number) => Promise<void>;
  handleDone: (todoId: number) => Promise<void>;
  handleDelete: (todoId: number) => void;
  rowRef: React.MutableRefObject<HTMLTableRowElement[]>;
  // checkBoxCellRef: React.MutableRefObject<HTMLTableCellElement[]>;
};

const UndoneTable: FC<Props> = ({
  priorityZone,
  filteredTask,
  handleMove,
  handleDone,
  handleDelete,
  rowRef,
  // checkBoxCellRef,
}) => {
  const [clickedDeleteIds, setClickedDeleteIds] = useState<number[]>([]);

  const clickedDelete = (id: number) => {
    setClickedDeleteIds((prev) => [...prev, id]);
    console.log("clickedDeleteIds");
    console.log(clickedDeleteIds);
  };

  return (
    <>
      <Table>
        <TableBody>
          {!filteredTask ? (
            <></>
          ) : (
            filteredTask.map((task: any, index: number) => (
              <TableRow
                key={task.id}
                ref={(el) => {
                  console.log(el);
                  (rowRef.current![index] as HTMLTableRowElement | null) = el;
                }}
              >
                {/* <TableCell width="5%" padding="checkbox" align="center" ref={checkBoxCellRef}> */}
                <TableCell width="5%" padding="checkbox" align="center">
                  <IconButton
                    onClick={() => {
                      // handleDone(task.id);
                    }}
                    aria-label="done"
                  >
                    <CheckBoxOutlineBlankIcon />
                  </IconButton>
                </TableCell>
                <TableCell width="70%" sx={{ color: "white" }}>
                  {/* <animated.div style={styles}> */}
                  {task.task}
                  {/* </animated.div> */}
                </TableCell>
                {/* 期限(日付) */}
                <TableCell width="15%" sx={{ color: "white" }} align="center">
                  {task.due
                    ? dayjs(task.due).format("YYYY-MM-DD").toString()
                    : ""}
                </TableCell>
                {/* refsボタン */}
                {task.refs === "" ? (
                  <TableCell sx={{ color: "white" }}></TableCell>
                ) : (
                  <TableCell sx={{ color: "white" }}>
                    <Button
                      variant="outlined"
                      background-color="info"
                      color="secondary"
                      style={{ minWidth: "10%" }}
                      onClick={() => window.open(task.refs)}
                    >
                      URL
                    </Button>
                  </TableCell>
                )}
                {/* 優先度調整ボタン */}
                <TableCell width="5%" align="center">
                  <IconButton
                    onClick={() => {
                      handleMove(task.id);
                    }}
                    aria-label="lower"
                  >
                    {priorityZone === TOP_PRIORITY ? (
                      <LowPriorityIcon />
                    ) : (
                      <VerticalAlignTopSharpIcon />
                    )}
                  </IconButton>
                </TableCell>
                {/* 削除ボタン */}
                <TableCell width="5%" align="center">
                  {clickedDeleteIds.some((v) => {
                    return v === task.id;
                  }) ? (
                    <IconButton
                      onClick={() => {
                        // clickedDelete(task.id);
                        // handleDelete(task.id);
                      }}
                      aria-label="delete"
                    >
                      <CircularStatic todoId={task.id} setClickedDeleteIds={setClickedDeleteIds}/>
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        clickedDelete(task.id);
                        setTimeout(handleDelete, 3000, task.id);
                        // handleDelete(task.id);
                        // setClickedDeleteIds((prev) => prev.filter((v) => v !== task.id));
                      }}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default UndoneTable;
