import React, { useState } from "react";
import { Card } from "antd";
import { Job } from "../util/types";
import JobDetailModal from "./JobDetailModal";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  job: Job;
  index: number;
}

const JobCard: React.FC<Props> = ({ job, index }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <Draggable draggableId={job.id.toString()} index={index}>
        {(provided) => (
          <div
            style={{
              overflowX: "auto",
              cursor: "pointer",
              
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card
              onClick={handleModalToggle}
              hoverable
              style={{ marginBottom: "1.5rem" }}
            >
              <p>
                <strong>Job Title:</strong> {job.title}
              </p>
              <p>
                <strong>Company:</strong> {job.company}
              </p>

              <p>
                {" "}
                <strong>Date added:</strong> {job.dateAdded.split("T")[0]}
              </p>
            </Card>

            <JobDetailModal
              visible={modalVisible}
              job={job}
              onClose={handleModalToggle}
            />
          </div>
        )}
      </Draggable>
    </>
  );
};

export default JobCard;
