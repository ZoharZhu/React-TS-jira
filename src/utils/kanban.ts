import { useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { useHttp } from "./http";

// 获取看板列表
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(
    ["kanbans", param], // 第一个是key 第二个代表依赖 param改变 useQuery就重新获取一次
    () => client("kanbans", { data: param })
  );
};
