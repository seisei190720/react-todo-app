import { FC, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import VerticalAlignTopSharpIcon from "@mui/icons-material/VerticalAlignTopSharp";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Button,
  Chip,
  ChipProps,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { TOP_PRIORITY, todoData } from "../../../types";
import React from "react";
import CircularStatic from "./assets/CircularStatic";
import TagListMenu from "./tag-menu/TagListMenu";
import { chipTheme, colorPropsWithColor } from "../../../../style/styleTheme";
import { useRecoilState } from "recoil";
import { taskTabCacheAtom } from "../../../../atoms/useTabApi";

type Props = {
  priorityZone: string;
  filteredTask: todoData[] | undefined;
  handleMove: (todoId: string) => Promise<void>;
  handleDone: (todoId: string) => Promise<void>;
  handleDelete: (todoId: string) => void;
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
  const [cachedTaskTab] = useRecoilState(taskTabCacheAtom);

  const defalutColor = {
    prop: "default",
    color: "#424242",
  };

  const clickedDelete = (id: number) => {
    setClickedDeleteIds((prev) => [...prev, id]);
  };

  const getColor = (tag: string) => {
    const colorObject = cachedTaskTab.find((item) => item.tabid === tag);
    const result = colorObject
      ? colorPropsWithColor.find((v) => v.prop === colorObject.color)
      : defalutColor;
    return result ? result.color : "#424242";
  };

  const getColorProp = (tag: string): ChipProps["color"] => {
    const colorObject = cachedTaskTab.find((item) => item.tabid === tag);
    return colorObject ? colorObject.color : "primary";
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
                  (rowRef.current![index] as HTMLTableRowElement | null) = el;
                }}
              >
                {/* <TableCell width="5%" padding="checkbox" align="center" ref={checkBoxCellRef}> */}
                <TableCell width="5%" padding="checkbox" align="center">
                  <IconButton
                    onClick={() => {
                      handleDone(task.id);
                    }}
                    aria-label="done"
                  >
                    <CheckBoxOutlineBlankIcon />
                  </IconButton>
                </TableCell>
                <TableCell width="70%" sx={{ color: "white" }}>
                  {/* <animated.div style={styles}> */}
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                  >
                    <Typography variant="subtitle2">
                      {task.task}
                      {/* </animated.div> */}
                    </Typography>
                    {task.tag !== "" && (
                      <ThemeProvider theme={chipTheme(getColor(task.tag))}>
                        <Chip
                          label={task.tag}
                          color={getColorProp(task.tag)}
                          variant="outlined"
                          size="medium"
                          sx={{
                            textTransform: "uppercase",
                          }}
                        />
                      </ThemeProvider>
                    )}
                  </Stack>
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
                {/* タグ付与ボタン */}
                <TableCell sx={{ color: "white" }}>
                  <TagListMenu selectedTask={task} />
                </TableCell>
                {/* 優先度調整ボタン */}
                <TableCell width="5%" align="center">
                  <IconButton
                    onClick={() => {
                      handleMove(task.id);
                    }}
                    aria-label="tag"
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
                      <CircularStatic
                        todoId={task.id}
                        setClickedDeleteIds={setClickedDeleteIds}
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        clickedDelete(task.id);
                        setTimeout(handleDelete, 3500, task.id);
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
