import { atom } from "recoil";

//状態を管理するためのデータストア
//AtomはkeyでAtom一つ一つにユニークなIDを設定し、defaultで初期値を設定できる。

export const tasksState = atom<
  {
    content: string;
    deadline: any;
  }[]
>({
  key: "tasksState",
  default: [],
});

export const testTasksState = atom<
  {
    id: number;
    task: string;
    done: number;
    due: Date;
  }[]
>({
  key: "taskContentState",
  default: [],
});
