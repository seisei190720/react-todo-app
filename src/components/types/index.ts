import { ChipProps } from "@mui/material";

export type todoData = {
    id: string;
    task: string;
    due: Date | null;
    done: number;
    //仮置きのnull
    priority: number | null;
    refs: string | null;
    till_today: number;
    done_date: string | null;
    tag: string;
  };

  export const TOP_PRIORITY = "top-priority";
  export const LOW_PRIORITY = "low-priority";

export type chip = {
  tabid: string,
  color: ChipProps['color'],
}