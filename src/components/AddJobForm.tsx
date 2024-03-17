import React, { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { Job } from "../util/types";
import useStore from "../util/store/store";

const AddJobForm: React.FC = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const addJob = useStore((state) => state.addJob);

  const handleAddJob = (job: Job, section: string) => {
    addJob(job, section);
  };

  const onFinish = (values: any) => {
    const newJob: Job = {
      id: Date.now(),
      title: values.title,
      company: values.company,
      jobUrl: values.jobUrl,
      section: values.section,
      salary: values.salary,
      location: values.location,
      description: values.description,
      tags: values.tags,
      dateAdded: new Date().toISOString(),
    };

    handleAddJob(newJob, newJob.section);
    form.resetFields();
    setVisible(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <h1>My 2024 Job Search</h1>
        <Button
          onClick={() => setVisible(true)}
          style={{
            background: "#4280dc",
            borderRadius: "6px",
            boxShadow: "0 4px 12px #0000001a",
            color: "#fff",
            height: "2.4rem",
            margin: "1rem 0.2rem 0.6rem",
            float: "right",
          }}
        >
          Add Job
        </Button>
        <Modal
          title="Add New Job"
          open={visible}
          onCancel={() => {
            form.resetFields();
            setVisible(false);
          }}
          footer={null}
        >
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="title"
              label="Job Title"
              rules={[
                { required: true, message: "Please enter valid job title" },
              ]}
            >
              <Input placeholder="Job Title" />
            </Form.Item>
            <Form.Item
              name="company"
              label="Company Name"
              rules={[
                { required: true, message: "Please enter valid company name" },
              ]}
            >
              <Input placeholder="Company Name" />
            </Form.Item>
            <Form.Item name="jobUrl" label="Job Url">
              <Input placeholder="Job Url" />
            </Form.Item>
            <Form.Item
              name="section"
              label="Section"
              rules={[
                { required: true, message: "Please enter valid section name" },
              ]}
            >
              <Select defaultValue="--Please select a section--">
                <Select.Option value="saved"> Saved </Select.Option>
                <Select.Option value="applied"> Applied</Select.Option>
                <Select.Option value="interviewing">
                  {" "}
                  Interviewing
                </Select.Option>
                <Select.Option value="offer"> Offer</Select.Option>
                <Select.Option value="rejected"> Rejected</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Paste or Type the Job Description here" />
            </Form.Item>
            <Form.Item name="tags" label="Tags">
              <Input placeholder="Tags" />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                Add Job
              </Button>
              <Button
                onClick={() => setVisible(false)}
                style={{ marginLeft: "8px" }}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AddJobForm;
