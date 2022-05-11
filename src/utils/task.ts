import { QueryKey, useMutation, useQuery } from "react-query";
import { useDebounce } from ".";
import { Task } from "../types/task";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

// 获取任务列表
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const debouncedParam = { ...param, name: useDebounce(param?.name, 200) };

  return useQuery<Task[]>(
    ["tasks", debouncedParam], // 第一个是key 第二个代表依赖 param改变 useQuery就重新获取一次
    () => client("tasks", { data: debouncedParam })
  );
};

// 添加任务
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

// 获取task详情
export const useTask = (id?: number) => {
  const client = useHttp();

  return useQuery<Task>(
    ["task", { id }],
    () => client(`tasks/${id}`),
    // 第三个是配置参数 即id有值时才触发Hook
    {
      enabled: Boolean(id),
    }
  );
};

// 编辑任务
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};
