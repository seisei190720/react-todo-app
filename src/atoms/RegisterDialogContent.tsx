import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { DefaultValue, atom, selector } from "recoil";
import { todoData } from "../components/types";

// export type todoData = {
//   id: number;
//   task: string;
//   done: number;
//   due: Date;
// };

export const options: AxiosRequestConfig = {
  url: "http://localhost:3000/tasks",
  method: "GET",
  responseType: "json",
};

export const taskApiSelector = selector<todoData[]>({
  key: "taskApiSelector",
  get: async ({ get }) => {
    try {
      const response = await axios(options);
      const res: todoData[] = await response.data;
      return res;
    } catch (error) {
      throw error;
    }
  },

  // コンポーネント側で使いやすいようにsetterも定義
  // コンポーネント側で直接myApiValueAtomを更新しても同じです。
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
  const response: AxiosResponse = await axios.post(
    "http://localhost:3000/task/add",
    todo
  );
  return response.data;
};

export const deleteTodo = (todoId: number) => {
  axios.delete(`http://localhost:3000/task/delete/${todoId}`).then((res) => {
    //おそらくmutate的なことをしているので、確認する
    // this?.$router.push({path: '/articles/list'});
  });
  // .catch(error => {
  //     alert("「" + responseBody.task + "」登録失敗");
  //     console.log(error, data);
  // });
};

export const updateToTillToday = async (todoId: number) => {
  const response: AxiosResponse = await axios.put(
    `http://localhost:3000/task/${todoId}/till-today`
  );
  return response.data;
};

export const updateToTillAfterTomorrow = async (todoId: number) => {
  const response: AxiosResponse = await axios.put(
    `http://localhost:3000/task/${todoId}/till-after-tomorrow`
  );
  return response.data;
};

export const updateToDone = async (todoId: number) => {
  const response: AxiosResponse = await axios.put(
    `http://localhost:3000/task/${todoId}/done`
  );
  return response.data;
};

export const updateToUndone = async (todoId: number) => {
  const response: AxiosResponse = await axios.put(
    `http://localhost:3000/task/${todoId}/undone`
  );
  return response.data;
};


export type users = {
  id: number;
  name: string;
  age: number;
  address: string;
  tel: string;
};
export const testLambda = async () => {
  const response: AxiosResponse = await axios.get(
    `https://qgbev7nje7.execute-api.ap-northeast-1.amazonaws.com/users-stage/users`
  );
  console.log("response");
  console.log(response);
  return response.data;
};