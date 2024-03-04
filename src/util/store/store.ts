import { create } from "zustand";
import { Job, Column } from "../types";

interface State {
    columns: Column[];
    addJob: (job: Job, section: string) => void;
    updateJob: (updatedJob: Job) => void;
}

const useStore = create<State>((set) => ({
    columns: [
        { id: "saved", title: "Saved", jobs: [] },
        { id: "applied", title: "Applied", jobs: [] },
        { id: "interviewing", title: "Interviewing", jobs: [] },
        { id: "offer", title: "Offer", jobs: [] },
        { id: "rejected", title: "Rejected", jobs: [] },
    ],
    addJob: (job, section) =>
        set((state) => ({
            columns: state.columns.map((column) =>
                column.id === section
                    ? {
                        ...column,
                        jobs: [job, ...column.jobs],
                    }
                    : column
            ),
        })),
    updateJob: (updatedJob) => {
        set((state) => ({
            columns: state.columns.map((column) => ({
                ...column,
                jobs: column.jobs.map((job) => {
                    if (job.id === updatedJob.id) {
                        return {
                            ...job,
                            ...updatedJob,
                        };
                    }
                    return job;
                }),
            })),
        }));
    },
}));

export default useStore;
