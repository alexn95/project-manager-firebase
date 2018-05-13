export interface Issue {
    id: string;
    number: number;
    summary: string;
    description: string;
    create_date: string;
    author_id: string;
    priority: string;
    type: string;
    state: number;
    assigne_user_id: string;
    project_id: string;
    sprint_id: string;
    days: number;
    comments: Comment[];
}
