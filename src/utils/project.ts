import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(
    ["projects", param], // 第一个是key 第二个代表依赖 param改变 useQuery就重新获取一次
    () => client("projects", { data: param })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

// 获取project详情
export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    // 第三个是配置参数 即id有值时才触发Hook
    {
      enabled: Boolean(id),
    }
  );
};
