export interface Job {
    id: number;
    title: string;
    company: string;
    jobUrl: string;
    description: string;
    tags: string;
    salary: number,
    location: string,
    section: string;
    dateAdded: string
}

export interface Column {
    id: string;
    title: string;
    jobs: Job[];
}

export interface Props {
    columns: Column[];
    onAddJob: (job: Job, columnId: string) => void;
    updateJob: (updatedJob: Job) => void;
    index: number;
    isMobileOrTablet: boolean;
}