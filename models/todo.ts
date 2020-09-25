export enum TodoStatus {
    NotStarted = 'Not Started',
    Inprogress = 'In Progress',
    Completed = 'Completed'
};
export interface Todo {
    id: number,
    description: string,
    status: TodoStatus
}