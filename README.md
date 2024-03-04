# Careerflow Jobtracker Project README

## Introduction

The Job Tracker project is a web application designed to help users organize and track their job search process. It provides features for managing job listings and tracking their status through different stages such as "Saved", "Applied", "Interviewing", "Offer", and "Rejected".

## Code Components

### `useStore` (Zustand Store)

- **Purpose**: Manages the application state using Zustand.
- **Functions**:
  - `addJob(job: Job, section: string)`: Adds a new job to the specified section.
  - `updateJob(updatedJob: Job)`: Updates the details of a job.
- **File**: `util/store/store.ts`

### `KanbanBoard` Component

- **Purpose**: Renders the Kanban board layout for displaying job listings organized into columns.
- **Functions**:
  - `handleDragEnd(result: DropResult)`: Handles drag and drop functionality for moving job cards between columns.
- **File**: `components/KanbanBoard.tsx`

### `KanbanColumn` Component

- **Purpose**: Represents a column in the Kanban board, containing job cards.
- **Props**:
  - `column`: Column data including title and associated jobs.
  - `isMobileOrTablet`: Boolean indicating if the device is mobile or tablet.
- **File**: `components/KanbanColumn.tsx`

### `JobCard` Component

- **Purpose**: Displays a single job card with job details.
- **Props**:
  - `job`: Job data including title, company, date added, etc.
  - `index`: Index of the job card in the column.
- **File**: `components/JobCard.tsx`

### `JobDetailModal` Component

- **Purpose**: Provides a modal for viewing and editing job details.
- **Props**:
  - `visible`: Boolean indicating modal visibility.
  - `job`: Job data to be displayed in the modal.
  - `onClose`: Callback function to close the modal.
- **File**: `components/JobDetailModal.tsx`

### `AddJobForm` Component

- **Purpose**: Renders a form for adding new job listings.
- **Functions**:
  - `onFinish(values: any)`: Handles form submission and adds a new job.
- **File**: `components/AddJobForm.tsx`

### `App` Component

- **Purpose**: Main component of the application, responsible for rendering the layout and managing global state.
- **Functions**:
  - `handleDragEnd(result: DropResult)`: Handles drag and drop functionality for moving job cards between columns.
- **File**: `App.tsx`

## Conclusion

The Job Tracker project consists of several components responsible for managing the application state, rendering the user interface, and handling user interactions. Each component plays a specific role in providing the functionality required for organizing and tracking job listings effectively.
