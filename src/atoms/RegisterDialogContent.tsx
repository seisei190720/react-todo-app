import axios, { AxiosResponse } from "axios";
import { DefaultValue, atom, selector } from "recoil";
import { todoData } from "../components/types";

export const TASK_URL =
  "https://uhqq3x567d.execute-api.ap-northeast-1.amazonaws.com/task-stage/task";

export const taskApiSelector = selector<todoData[]>({
  key: "taskApiSelector",
  get: async ({ get }) => {
    try {
      const response = await axios.get(TASK_URL);
      const res: todoData[] = await response.data;
      return res;
    } catch (error) {
      throw error;
    }
  },

  // コンポーネント側で使いやすいようにsetterも定義
  // コンポーネント側で直接myApiValueAtomを更新しても同じ。
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      //キャッシュクリア用のお約束
      return newValue;
    } else {
      //atomにキャッシュとして保存する
      //第1引数(Atom)に、第2引数(todo[])を追加する
      set(taskCacheAtom, newValue);
    }
  },
});

// キャッシュ置き場
export const taskCacheAtom = atom<todoData[] | null>({
  key: "taskCacheAtom",
  default: null,
});

export const registerTaskApi = async (todo: todoData) => {
  //TODO エラーハンドリング
  const response: AxiosResponse = await axios.post(TASK_URL, todo);
  return response.data;
};

export const deleteTodo = (todoId: string) => {
  axios.delete(TASK_URL + `?id=${todoId}`).then((res) => {});
};

export const updateTillToday = async (todoId: string, tillTodayFlg: number) => {
  const response: AxiosResponse = await axios.put(TASK_URL, {
    todoId: todoId,
    done: 0,
    tillTodayFlg: tillTodayFlg,
  });
  return response.data;
};

export const updateDone = async (todoId: string, done: number) => {
  const response: AxiosResponse = await axios.put(TASK_URL, {
    todoId: todoId,
    done: done,
    tillTodayFlg: 0,
  });
  return response.data;
};
