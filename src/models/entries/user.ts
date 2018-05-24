import { Invite } from './invite';
import { UserProject } from './user-project';
export class User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    invites?: Invite[];
    projects?: UserProject[];
}
