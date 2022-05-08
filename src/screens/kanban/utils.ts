import { useLocation } from "react-router";
import { useProject } from "../../utils/project";

// 获取url中的projectid
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  // ()包裹住的匹配到的字符串就是返回数组的第二个数据
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
