import { Invite } from './invite';
import { UserProject } from '../../app/project/project-users/user-project.model';
export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    invites?: Invite[];
    projects?: UserProject[];
}
