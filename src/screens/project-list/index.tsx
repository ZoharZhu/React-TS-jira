import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectModal, useProjectsSearchParams } from "./utils";
import { ButtonNoPadding, ErrorBox, Row } from "../../components/lib";

// 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
// https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const { open } = useProjectModal();

  const [param, setParam] = useProjectsSearchParams();
  const debouncedParam = useDebounce(param, 500);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type="link">
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
