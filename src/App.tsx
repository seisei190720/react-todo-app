import "./style/App.css";
import React, { Suspense } from "react";
import { DialogContent, ThemeProvider } from "@mui/material";
import { RecoilRoot } from "recoil";
import { theme } from "./style/styleTheme";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import AuthComponent from "./AuthComponent";

Amplify.configure(awsExports);
function App({ signOut, user }: { signOut: () => void; user: any }) {
  return (
    <RecoilRoot key={user.username}>
      <Suspense fallback={<div>Loading...</div>}>
        <DialogContent className="App">
          <ThemeProvider theme={theme}>
              <AuthComponent user={user} signOut={signOut} />
          </ThemeProvider>
        </DialogContent>
      </Suspense>
    </RecoilRoot>
  );
}
export default withAuthenticator(App); // 認証に必要
