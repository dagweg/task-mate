
export interface SubTaskType {
    id: string,
    title: string,
    description: string,
    isComplete: boolean,
    isOpen: boolean,
    isEditMode: boolean,
    isFirstTime: boolean,
    removeSubTaskCallback: (subTaskId: string) => void
}

export interface TaskPaneType {
    id: string,
    title: string,
    subtasks: SubTaskType[],
    description?: string,
    isEditMode: boolean,
    isFirstTime: boolean,
    removeTaskPaneCallback: (taskPaneId: string) => void
}