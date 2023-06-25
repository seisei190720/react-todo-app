import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { FC, useState } from "react";
import {
  registerTaskTabApi,
  taskTabCacheAtom,
} from "../../../../../atoms/useTabApi";
import { useRecoilState } from "recoil";
import { colorProps } from "../../../../../style/styleTheme";
import { chip } from "../../../../types";
import { userInfoCacheAtom } from "../../../../../atoms/useUserInfo";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const AddTagDialog: FC<Props> = ({ open, handleClose }) => {
  const [cachedUserInfo] = useRecoilState(userInfoCacheAtom);
  const [cachedTaskTab, setCachedTaskTab] = useRecoilState(taskTabCacheAtom);
  const [tagContent, setTagContent] = useState<string>("");
  //   タグの内容が変更された時
  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTagContent(e.target.value);
  };

  const handlePostTag = async () => {
    if(!cachedUserInfo) return;
    const randomNumber = Math.floor(Math.random() * 6);
    const addedTag: chip = await registerTaskTabApi(
      tagContent,
      colorProps[randomNumber],
      cachedUserInfo.sub,
    );
    setCachedTaskTab([...cachedTaskTab, addedTag]);
    setTagContent("");
    handleClose();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Tag</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleContentChange}
            value={tagContent}
            autoFocus
            margin="dense"
            id="name"
            label="tag name"
            type="text"
            fullWidth
            variant="standard"
            focused
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePostTag}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTagDialog;
