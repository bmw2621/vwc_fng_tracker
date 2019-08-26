export const tasksQuery = (): string => {
  return `
    {
      tasks(func:eq(type, "Task")) {
        uid
        expand(_all_)
      }
    }
  `
}
