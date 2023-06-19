import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  ThemeProvider,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { FC } from "react";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { Check } from "@mui/icons-material";
import {
  deleteTaskTabApi,
  taskCacheAtom,
  taskTabCacheAtom,
  updateTag,
} from "../../../../atoms/RegisterDialogContent";
import { useRecoilState } from "recoil";
import AddIcon from "@mui/icons-material/Add";
import AddTagDialog from "./AddTagDialog";
import { tabListTheme } from "../../../../style/styleTheme";
import { todoData } from "../../../types";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type Props = {
  selectedTask: todoData;
};

const TagListMenu: FC<Props> = ({ selectedTask }) => {
  const [cachedTaskTab, setCachedTaskTab] = useRecoilState(taskTabCacheAtom);
  const [cachedTask, setCachedTask] = useRecoilState(taskCacheAtom);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openAddNewTag, setOpenAddNewTag] = React.useState(false);

  //SelectTag
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectTag = async (tag: string) => {
    const updatedTask = await updateTag(selectedTask.id, tag);
    //TODO 各タスクに紐づくタグ情報を更新する
    handleClose();
    await setCachedTask(updatedTask);
  };

  //AddTag
  const handleAddTagClickOpen = () => {
    setOpenAddNewTag(true);
  };

  const handleAddTagClose = () => {
    setOpenAddNewTag(false);
  };

  const handleIconButtonClick = async(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tabId: string
  ) => {
    event.stopPropagation();
    await deleteTaskTabApi(tabId);
    const updatedTabs = cachedTaskTab.filter((v) => v.tabid !== tabId);
    setCachedTaskTab(updatedTabs);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <LabelOutlinedIcon />
      </IconButton>
      <ThemeProvider theme={tabListTheme}>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {cachedTaskTab.map((v) => {
            return selectedTask.tag === v.tabid ? (
              <MenuItem
                onClick={() => {
                  handleSelectTag(v.tabid);
                }}
              >
                <ListItemIcon>
                  <Check
                    sx={{ color: "secondary", textTransform: "uppercase" }}
                  />
                </ListItemIcon>
                {v.tabid}
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  handleSelectTag(v.tabid);
                }}
              >
                <ListItemText
                  inset
                  sx={{
                    color: "secondary",
                    textTransform: "uppercase",
                    paddingRight: "2px",
                  }}
                >
                  {v.tabid}
                </ListItemText>
                {/* 使用されていないタグは削除ボタンを表示する */}
                {cachedTask.every((task) => task.tag !== v.tabid) && (
                  <IconButton onClick={(e) => handleIconButtonClick(e, v.tabid)}>
                    <HighlightOffIcon />
                  </IconButton>
                )}
              </MenuItem>
            );
          })}
          <Divider />
          <MenuItem onClick={handleAddTagClickOpen}>
            <AddIcon sx={{ color: "secondary" }} />
            add New Tag...
          </MenuItem>
        </Menu>
        <AddTagDialog open={openAddNewTag} handleClose={handleAddTagClose} />
      </ThemeProvider>
    </>
  );
};

export default TagListMenu;
