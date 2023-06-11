export type todoData = {
    id: number;
    task: string;
    due: Date | null;
    done: number;
    //仮置きのnull
    priority: number | null;
    refs: string | null;
    till_today: number;
    done_date: Date | null;
  };

  export const TOP_PRIORITY = "top-priority";
  export const LOW_PRIORITY = "low-priority";