import { UserRole } from './user-role';
export interface Project {
    id: string;
    title: string;
    code: string;
    description: string;
    create_date: string;
    issues_count: number;
    users: UserRole[];
}
