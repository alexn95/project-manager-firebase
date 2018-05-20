export interface Issue {
    id: string;
    number: number;
    summary: string;
    description: string;
    priority: string;
    type: string;
    state: number;
    assigned_user_id: string;
    project_id: string;
    sprint_id: string;
    days: number;

    create_date: number;
    author_id: string;

    update_date?: number;
    update_user_id?: string;
}
