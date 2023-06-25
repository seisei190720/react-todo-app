import { FC, useEffect } from "react";
import TodoRegister from "./components/register/TodoRegister";
import TodoList from "./components/todoList/TodoList";
import { useRecoilState } from "recoil";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { userInfoCacheAtom } from "./atoms/useUserInfo";
import Button from "@mui/material/Button";

type Props = {
  // userName: string,
  // userSub: string,
  user: any;
  signOut: () => void;
};

const AuthComponent: FC<Props> = ({
  // userName,
  // userSub,
  user,
  signOut,
}) => {
  const [cachedUsrInfo, setCachedUsrInfo] = useRecoilState(userInfoCacheAtom);

  useEffect(() => {
    setCachedUsrInfo({
      name: user.username,
      sub: user.attributes.sub,
    });
  }, [setCachedUsrInfo, user.attributes.sub, user.username]);
  return (
    <>
      {user ? (
        <>
          <TodoRegister />
          <TodoList />
          <h3>{`Login with ${user.username}`}</h3>
          <Button
            variant="outlined"
            background-color="info"
            color="secondary"
            style={{ minWidth: "15%" }}
            onClick={signOut}
          >
            Logout
          </Button>
        </>
      ) : (
        <h3>ログインしてください。</h3>
      )}
    </>
  );
};

export default withAuthenticator(AuthComponent);
