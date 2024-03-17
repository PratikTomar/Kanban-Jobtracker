import React from "react";
import { Row } from "antd";
import "../../src/App.css";
import { Column } from "../util/types";
import useStore from "../util/store/store";
import { KanbanColumn } from "./KanbanColumn";

interface Props {
  columns: Column[];
}
const KanbanBoard: React.FC<Props> = () => {
  const columns = useStore((state) => state.columns);
  const isMobileOrTablet = window.innerWidth < 769;
  return isMobileOrTablet ? (
    <Row gutter={[16, 16]} style={{ overflowX: "auto" }}>
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          isMobileOrTablet={isMobileOrTablet}
        />
      ))}
    </Row>
  ) : (
    <div
      className="column-container"
      style={{
        display: "flex",
        overflowX: "scroll",
        flexWrap: "nowrap",
        whiteSpace: "nowrap"
      }}
    >
      {columns.map((column) => (
        <div
          key={column.id}
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "20rem",
            width: "20rem",
          }}
        >
          <KanbanColumn
            key={column.id}
            column={column}
            isMobileOrTablet={isMobileOrTablet}
          />
        </div>
      ))}
    </div>
  );
};
export default KanbanBoard;