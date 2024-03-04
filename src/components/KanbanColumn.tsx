import React from "react";
import { Button, Card, Col } from "antd";
import JobCard from "./JobCard";
import useStore from "../util/store/store";
import { Droppable } from "react-beautiful-dnd";
import { Column } from "../util/types";

interface Props {
  column: Column;
  isMobileOrTablet: boolean;
}

export const KanbanColumn: React.FC<Props> = ({ column, isMobileOrTablet }) => {
  const jobCount = useStore(
    (state) =>
      state.columns.find((col) => col.id === column.id)?.jobs.length ?? 0
  );

  return (
    <Col
      xs={24}
      sm={12}
      md={8}
      lg={isMobileOrTablet ? 6 : 16}
      xl={isMobileOrTablet ? 6 : 24}
    >
      <Card
        title={column.title}
        style={{
          boxSizing: "border-box",
          background: "#e6eefb",
          borderRadius: "6px",
          border: "1px solid #e1edff",
          boxShadow: "0 1px 3px 0 #0000001a, 0 1px 2px 0 #0000000f",
          height: "80vh",
          marginRight: "1rem",
          overflowY: "auto",
        }}
        extra={
          <Button
            style={{
              background: "rgb(202, 217, 246)",
              boxShadow: "none",
              border: "6px",
              color: "black",
            }}
          >
            {jobCount === 0 ? "0 Job" : `${jobCount} Jobs`}
          </Button>
        }
      >
        <Droppable droppableId={column.id} key={column.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                minHeight: "300px",
              }}
            >
              {column.jobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
    </Col>
  );
};
