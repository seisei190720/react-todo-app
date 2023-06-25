import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
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
import { todoData } from "../../../types";
import React from "react";
import { chipTheme } from "../../../../style/styleTheme";
import { useRecoilState } from "recoil";
import { taskTabCacheAtom } from "../../../../atoms/useTabApi";

type Props = {
  filteredTask: todoData[] | undefined;
  handleUndone: (todoId: string) => Promise<void>;
  handleDelete: (todoId: string) => void;
  rowRef: React.MutableRefObject<HTMLTableRowElement[]>;
};

const DoneTable: FC<Props> = ({
  filteredTask,
  handleUndone,
  handleDelete,
  rowRef,
}) => {
  const [cachedTaskTab] = useRecoilState(taskTabCacheAtom);
  const getColor = (tag: string): ChipProps["color"] => {
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
                <TableCell width="5%" padding="checkbox" align="center">
                  <IconButton
                    onClick={() => {
                      handleUndone(task.id);
                    }}
                    aria-label="undone"
                  >
                    <CheckBoxIcon />
                  </IconButton>
                </TableCell>
                <TableCell
                  width="70%"
                  sx={{
                    color: "white",
                  }}
                >
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
                      <ThemeProvider theme={chipTheme("#ffb74d")}>
                        <Chip
                          label={task.tag}
                          color={getColor(task.tag)}
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
                <TableCell width="10%" align="center">
                  <IconButton
                    onClick={() => {
                      handleDelete(task.id);
                    }}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default DoneTable;
