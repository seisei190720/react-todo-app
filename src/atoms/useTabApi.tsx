import { DefaultValue, atom, selector } from "recoil";
import { chip } from "../components/types";
import axios, { AxiosResponse } from "axios";
import { Auth } from "aws-amplify";

export const selectedTabAtom = atom<string>({
  key: "selectedTabAtom",
  default: "all",
});

export const TASK_TAB_URL =
  "https://x52i9gexw0.execute-api.ap-northeast-1.amazonaws.com/tab-stage/task-tab";

export const taskTabApiSelector = selector<chip[]>({
  key: "taskTabApiSelector",
  get: async ({ get }) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const response = await axios.get(TASK_TAB_URL, {
        params: {
          usersub: user.attributes.sub,
        },
      });
      const res = await response.data;
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
      set(taskTabCacheAtom, newValue);
    }
  },
});

// キャッシュ置き場
export const taskTabCacheAtom = atom<chip[]>({
  key: "taskTabCacheAtom",
  default: [],
});

export const registerTaskTabApi = async (
  tabId: string,
  color: string,
  usersub: string
) => {
  //TODO エラーハンドリング
  const response: AxiosResponse = await axios.post(TASK_TAB_URL, {
    tabId: tabId,
    color: color,
    usersub: usersub,
  });
  return response.data;
};

export const deleteTaskTabApi = (tabId: string) => {
  axios.delete(TASK_TAB_URL + `?id=${tabId}`).then((res) => {});
};
