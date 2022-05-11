import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-options";

// 获取看板列表
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(
    ["kanbans", param], // 第一个是key 第二个代表依赖 param改变 useQuery就重新获取一次
    () => client("kanbans", { data: param })
  );
};

// 添加看板
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};
