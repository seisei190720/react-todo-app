import { grey } from "@mui/material/colors";
import { todoData } from "../../../types";

export const UseLowerTargetIndex = (
  updatedTask: todoData[],
  todoId: string,
  selectedTab: string,
  updatedToLowerRowRef: React.MutableRefObject<HTMLTableRowElement[]>
) => {
  const targetTaskIndex = updatedTask
    ?.filter((task) => !(selectedTab !== "all" && task.tag !== selectedTab))
    .filter((value) => value.done === 0 && value.till_today === 0)
    .sort()
    .findIndex((v) => v.id === todoId);
  useHighLightRow(targetTaskIndex, updatedToLowerRowRef);
};
export const UseHigherTargetIndex = (
  updatedTask: todoData[],
  todoId: string,
  selectedTab: string,
  updatedToHigherRowRef: React.MutableRefObject<HTMLTableRowElement[]>
) => {
  const targetTaskIndex = updatedTask
    ?.filter((task) => !(selectedTab !== "all" && task.tag !== selectedTab))
    .filter((value) => value.done === 0 && value.till_today === 1)
    .sort()
    .findIndex((v) => v.id === todoId);
  useHighLightRow(targetTaskIndex, updatedToHigherRowRef);
};

export const UseDoneTargetIndex = (
  updatedTask: todoData[],
  todoId: string,
  selectedTab: string,
  updatedToUndoneRowRef: React.MutableRefObject<HTMLTableRowElement[]>
) => {
  const targetTaskIndex = updatedTask
    ?.filter((task) => !(selectedTab !== "all" && task.tag !== selectedTab))
    .filter((value) => value.done === 1)
    .sort()
    .findIndex((v) => v.id === todoId);
  useHighLightRow(targetTaskIndex, updatedToUndoneRowRef);
};

export const useHighLightRow = (
  filteredTaskLength: number | undefined,
  rowRef: React.MutableRefObject<HTMLTableRowElement[]>
) => {
  if (filteredTaskLength === undefined) return;
  const tableRow = rowRef.current[filteredTaskLength];
  if (tableRow) {
    tableRow.style.backgroundColor = grey[800];
    setTimeout(() => {
      tableRow.style.backgroundColor = "";
    }, 2000);
  }
};
