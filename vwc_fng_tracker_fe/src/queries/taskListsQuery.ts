export const taskListsQuery = (): string => {
  return `
    {
      taskListsQuery(func:eq(type, "TaskList")) {
        uid
        expand(_all_)
      }
    }
  `
}
