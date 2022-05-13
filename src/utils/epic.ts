import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "../types/epic";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

// 获取任务组列表
export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[]>(
    ["epics", param], // 第一个是key 第二个代表依赖 param改变 useQuery就重新获取一次
    () => client("epics", { data: param })
  );
};

// 添加任务组
export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

// 删除任务组
export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
