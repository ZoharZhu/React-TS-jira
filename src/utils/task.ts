import { useQuery } from "react-query";
import { Task } from "../types/task";
import { useHttp } from "./http";

// 获取任务列表
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(
    ["tasks", param], // 第一个是key 第二个代表依赖 param改变 useQuery就重新获取一次
    () => client("tasks", { data: param })
  );
};
