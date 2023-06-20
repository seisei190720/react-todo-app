import { useMemo } from "react";
import { todoData } from "../../../types";

export const useGroupTask = (cachedTask: todoData[], selectedTab: string) => {
  const tillTodayTask = useMemo(() => {
    return cachedTask
      ?.filter((task) => !(selectedTab !== "all" && task.tag !== selectedTab))
      .filter((value) => value.done === 0 && value.till_today === 1)
      .sort();
  }, [cachedTask, selectedTab]);

  const tillAfterTomorrowTask = useMemo(() => {
    return cachedTask
      ?.filter((task) => !(selectedTab !== "all" && task.tag !== selectedTab))
      .filter((value) => value.done === 0 && value.till_today === 0)
      .sort();
  }, [cachedTask, selectedTab]);

  const doneTask = useMemo(() => {
    return cachedTask
      ?.filter((task) => !(selectedTab !== "all" && task.tag !== selectedTab))
      .filter((value) => value.done === 1)
      .sort();
  }, [cachedTask, selectedTab]);

  return {
    tillTodayTask: tillTodayTask,
    tillAfterTomorrowTask: tillAfterTomorrowTask,
    doneTask: doneTask,
  };
};
