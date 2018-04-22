export interface Project {
    id: number;
    title: string;
    description: string;
    state: string;
    create_date: string;
    issues_count?: number;
    access: string;
}
