import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { TaskTypeSelect } from "../../components/task-type-select";
import { UserSelect } from "../../components/user-select";
import { useEditTask } from "../../utils/task";
import { useTasksModal, useTasksQueryKey } from "./utils";

// antd自带的样式规则
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      okText="确认"
      cancelText="取消"
      title="编辑任务"
      confirmLoading={editLoading}
      visible={!!editingTaskId}
      onOk={onOk}
      onCancel={onCancel}
      forceRender={true}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName={"经办人"} />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
    </Modal>
  );
};
