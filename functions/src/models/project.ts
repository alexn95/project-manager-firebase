export interface Project {
    id: number;
    title: string;
    description: string;
    state: string;
    create_date: string;
    task_count?: number;
}
