export enum issuesState {
    open,
    inProgress,
    toVerify,
    done
}

export const issuesStatesArray = [
    'Open',
    'In progress',
    'To verify',
    'Done'
];

export enum issuesPrioroty {
    minor,
    normal,
    major,
    critical
}

export const issuesPriorityArray = [
    'Minor',
    'Normal',
    'Major',
    'Critical'
];

export enum issuesType {
    task,
    bug
}

export const issuesTypeArray = [
    'Task',
    'Bug'
];
