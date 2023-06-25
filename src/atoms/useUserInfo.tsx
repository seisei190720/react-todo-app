import { atom } from "recoil";
import { UserInfo } from "../components/types";

// キャッシュ置き場
export const userInfoCacheAtom = atom<UserInfo | undefined>({
    key: "userInfoCacheAtom",
    default: undefined,
  });

export const beforeUserInfoCacheAtom = atom<UserInfo | undefined>({
    key: "beforeUserInfoCacheAtom",
    default: undefined,
  });

  export const snacBarOpenAtom = atom<boolean>({
    key: "snacBarOpenAtom",
    default: false,
  });