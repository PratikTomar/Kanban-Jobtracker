import React from "react";
import { Layout } from "antd";
import KanbanBoard from "./KanbanBoard";
import useStore from "../util/store/store";
import AddJobForm from "./AddJobForm";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "../../src/App.css";

const { Header, Content } = Layout;

const App: React.FC = () => {
  const columns = useStore((state) => state.columns);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || !draggableId) {
      return;
    }

    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destinationColumn = columns.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceColumn || !destinationColumn) {
      return;
    }

    const updatedColumns = [...columns];

    if (sourceColumn === destinationColumn) {
      const updatedJobs = Array.from(sourceColumn.jobs);
      const [removedJob] = updatedJobs.splice(source.index, 1);
      updatedJobs.splice(destination.index, 0, removedJob);

      updatedColumns.forEach((col) => {
        if (col.id === sourceColumn.id) {
          col.jobs = updatedJobs;
        }
      });
    } else {
      const sourceJobs = Array.from(sourceColumn.jobs);
      const destinationJobs = Array.from(destinationColumn.jobs);
      const [draggedJob] = sourceJobs.splice(source.index, 1);
      destinationJobs.splice(destination.index, 0, draggedJob);

      updatedColumns.forEach((col) => {
        if (col.id === sourceColumn.id) {
          col.jobs = sourceJobs;
        } else if (col.id === destinationColumn.id) {
          col.jobs = destinationJobs;
        }
      });
    }

    useStore.setState({ columns: updatedColumns });
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(21, 44, 91)" }}></Header>
      <Content
        style={{
          padding: "42px",
        }}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <AddJobForm />
          <KanbanBoard columns={columns} />
        </DragDropContext>
      </Content>
    </Layout>
  );
};

export default App;
