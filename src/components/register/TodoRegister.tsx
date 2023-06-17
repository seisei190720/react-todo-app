import { Button, Stack, TextField, ThemeProvider } from "@mui/material";
import { theme } from "../../App";
import { useRecoilState } from "recoil";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { registerTaskApi, taskCacheAtom } from "../../atoms/RegisterDialogContent";
import { useEffect, useRef, useState } from "react";
import { todoData } from "../types";
import React from "react";

export default function TodoRegister() {
  const [cachedTask, setCachedTask] = useRecoilState(taskCacheAtom);
  const ref = useRef<HTMLInputElement>(null);

  const [taskContent, setTaskContent] = useState<todoData>({
    id: "",
    task: "",
    due: null,
    done: 0,
    priority: 0,
    refs: "",
    till_today: 0,
    done_date: null,
  });

  useEffect(() => {
    console.log("キャッシュされているタスク一覧");
    console.log(cachedTask);
  }, [cachedTask]);

  const handlerRegister = async () => {
    // const registeredTask: todoData = await registerTaskApi({...taskContent});
    const registeredTask: todoData = await registerTaskApi(taskContent);
    setCachedTask((prev) =>
      prev ? [...prev, registeredTask] : [registeredTask]
    ); //cacheの中身を置き換える
    setTaskContent((prev) => ({ ...prev, task: "", refs: "", date: "MM/DD/YYYY"})); //TextFieldの初期化
    ref.current?.focus();//TextFieldをfocus
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
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      handlerRegister();
    }
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <AppBar position='static' > */}
      {/* <Toolbar> */}
      {/* <Typography variant="h6" color="secondary">
                        <Box fontFamily="Monospace" fontSize="h6.fontSize" m={1}>
                            TO DO
                        </Box>
                    </Typography> */}

      {/* <Container maxWidth={false}> */}
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
          style={{ minWidth: "45%", background: "#323232"}}
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
          style={{ minWidth: "20%", background: "#323232"}}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            // defaultValue={dayjs(new Date())}
            onChange={(date) => handleDeadlineChange(date)}
            label={dayjs(new Date()).toString()}
            slotProps={{
              textField: {
                // value: taskContent.due,
                variant: "filled",
                color: "secondary",
                // focused: false,
                label: "DATE",
                style: {  minWidth: "15%", background: "#323232" },
              },
            }}
          />
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
      {/* </Container> */}
      {/* </Toolbar> */}
      {/* </AppBar> */}
    </ThemeProvider>
  );
}
