export interface Task {
  id: number | undefined;
  title: string | undefined;
  type: string | undefined;
  description: string | undefined;
  boardId: string | undefined;
  icon: string | undefined;
}

export interface table {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  tasks: (Task | undefined)[] | undefined;
}