import { Button, Stack, TextField, ThemeProvider } from "@mui/material";
import { useRecoilState } from "recoil";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  registerTaskApi,
  selectedTabAtom,
  taskCacheAtom,
} from "../../atoms/RegisterDialogContent";
import { useRef, useState } from "react";
import { todoData } from "../types";
import React from "react";
import grey from "@mui/material/colors/grey";
import { datePickerTheme } from "../../style/styleTheme";

export default function TodoRegister() {
  const [cachedTask, setCachedTask] = useRecoilState(taskCacheAtom);
  const ref = useRef<HTMLInputElement>(null);
  const [resetKey, setResetKey] = useState(0);
  const [selectedTab] = useRecoilState(selectedTabAtom);

  const [taskContent, setTaskContent] = useState<todoData>({
    id: "",
    task: "",
    due: null,
    done: 0,
    priority: 0,
    refs: "",
    till_today: 0,
    done_date: null,
    tag: "",
  });

  const handlerRegister = async () => {
    const taskContentWithTag: todoData = {
      ...taskContent,
      tag: selectedTab === "all" ? "" : selectedTab,
    };
    const registeredTask: todoData = await registerTaskApi(taskContentWithTag);
    setCachedTask((prev) =>
      prev ? [...prev, registeredTask] : [registeredTask]
    ); //cacheの中身を置き換える
    setTaskContent((prev) => ({
      ...prev,
      task: "",
      refs: "",
      tag: "",
    })); //TextFieldの初期化
    setResetKey((prevKey) => prevKey + 1); //keyをリセットすることでDatePickerを初期化できる
    ref.current?.focus(); //TextFieldをfocus
  };

  //   タスクの内容が変更された時
  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTaskContent((prev) => ({ ...prev, task: e.target.value }));
  };

  //   URLの内容が変更された時
  const handleUrlChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTaskContent((prev) => ({ ...prev, refs: e.target.value }));
  };

  const handleDeadlineChange = (date: any) => {
    setTaskContent((prev) => ({ ...prev, due: date }));
  };

  //ctrl + EnterでRegister
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      handlerRegister();
    }
  };

  return (
    <>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <TextField
          inputRef={ref}
          onChange={handleContentChange}
          value={taskContent.task}
          label="TODO"
          variant="filled"
          color="secondary"
          placeholder="type your new todo"
          inputProps={{ style: { color: "white" } }}
          style={{ minWidth: "45%", background: grey[800] }}
          onKeyDown={handleKeyDown}
          // focused
        />
        <TextField
          onChange={handleUrlChange}
          value={taskContent.refs}
          label="URL"
          variant="filled"
          color="secondary"
          placeholder="paste link"
          inputProps={{ style: { color: "white" } }}
          style={{ minWidth: "20%", background: grey[800] }}
          onKeyDown={handleKeyDown}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={datePickerTheme}>
            <DatePicker
              key={resetKey}
              // defaultValue={dayjs(new Date())}
              onChange={(date) => handleDeadlineChange(date)}
              // label={dayjs(new Date()).toString()}
              slotProps={{
                textField: {
                  // value: taskContent.due,
                  variant: "filled",
                  color: "secondary",
                  // focused: false,
                  label: "DATE",
                  style: { minWidth: "15%", background: grey[800] },
                  inputProps: { style: { color: "white" } },
                },
              }}
            />
          </ThemeProvider>
        </LocalizationProvider>
        <Button
          variant="outlined"
          background-color="info"
          color="secondary"
          style={{ minWidth: "15%" }}
          onClick={handlerRegister}
        >
          register
        </Button>
      </Stack>
    </>
  );
}
