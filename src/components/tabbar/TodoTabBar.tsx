import { Tab, Tabs } from "@mui/material";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { chip } from "../types";
import { colorPropsWithColor } from "../../style/styleTheme";
import { selectedTabAtom, taskTabApiSelector, taskTabCacheAtom } from "../../atoms/useTabApi";

export default function TodoTabBar() {
  const [savedTaskTab, store] = useRecoilState<chip[]>(taskTabApiSelector);
  const [cachedTaskTab] = useRecoilState(taskTabCacheAtom);
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabAtom);
  useEffect(() => {
    store(savedTaskTab); // 初回fetchで返った値をselectorに保存する
  }, [savedTaskTab, store]);

  const getColor = (prop: string) => {
    const colorObject = colorPropsWithColor.find(item => item.prop === prop);
    return colorObject ? colorObject.color : "#f06292";
  }
  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={(e, v) => setSelectedTab(v)}
        variant="scrollable"
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="all" label="All" />
        {cachedTaskTab.map((v) => {
          return (
            <Tab
              value={v.tabid}
              label={v.tabid}
              style={{ color: v.color ? getColor(v.color?.toString()): "default" }}
            />
          );
        })}
      </Tabs>
    </>
  );
}
