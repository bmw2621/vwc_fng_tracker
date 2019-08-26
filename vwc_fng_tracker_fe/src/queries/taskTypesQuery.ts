export const taskTypesQuery = (): string => {
  return `
    {
      taskTypes(func:eq(type, "TaskType")) {
        uid
        expand(_all_)
      }
    }
  `
}
