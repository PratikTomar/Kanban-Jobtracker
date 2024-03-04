import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { Job } from "../util/types";
import useStore from "../util/store/store";

interface Props {
  visible: boolean;
  job: Job;
  onClose: () => void;
}

const JobDetailModal: React.FC<Props> = ({ visible, job, onClose }) => {
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const updateJob = useStore((state) => state.updateJob);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        title: job.title,
        company: job.company,
        jobUrl: job.jobUrl || "",
        salary: job.salary || "",
        location: job.location || "",
        description: job.description || "",
        tags: job.tags || "",
      });
    }
  }, [visible, job, form]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleUpdateJob = () => {
    form.validateFields().then((values) => {
      updateJob({ ...job, ...values });
      form.resetFields();
      setEditMode(!editMode);
      onClose();
    });
  };
  return (
    <Modal
      title="Edit Details"
      open={visible}
      onCancel={() => {
        form.resetFields();
        setEditMode(false);
        onClose();
      }}
      footer={[
        <Button key="edit" onClick={handleEditToggle}>
          {editMode ? "Cancel" : "Edit"}
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdateJob}>
          Save Changes
        </Button>,
      ]}
    >
      {editMode ? (
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item name="title" label="Job Title">
            <Input placeholder="Job Title" />
          </Form.Item>
          <Form.Item name="company" label="Company">
            <Input placeholder="Company Name" />
          </Form.Item>
          <Form.Item name="jobUrl" label="Job Post URL">
            <Input placeholder="Enter job url" />
          </Form.Item>
          <Form.Item name="salary" label="Salary">
            <Input type="number" placeholder="50000" />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input placeholder="Location" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Input placeholder="Tags" />
          </Form.Item>
        </Form>
      ) : (
        <>
          <p>
            <strong>Title:</strong> {job.title}
          </p>
          <p>
            <strong>Company:</strong> {job.company}
          </p>
          {job.jobUrl && (
            <p>
              <strong>Job Url:</strong> {job.jobUrl}
            </p>
          )}
          {job.salary && (
            <p>
              <strong>Salary:</strong> {job.salary}
            </p>
          )}
          {job.location && (
            <p>
              <strong>Location:</strong> {job.location}
            </p>
          )}
          {job.description && (
            <p>
              <strong>Description:</strong> {job.description}
            </p>
          )}
          {job.tags && (
            <p>
              <strong>Tags:</strong> {job.tags}
            </p>
          )}
        </>
      )}
    </Modal>
  );
};

export default JobDetailModal;
