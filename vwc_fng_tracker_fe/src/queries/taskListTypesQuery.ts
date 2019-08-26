export const taskListTypesQuery = (): string => {
  return `
    {
      taskListTypes(func:eq(type, "TaskListType")) {
        uid
        associatedWith
        name
        taskTypes: hasTaskTypes {
          uid
          ownerUid
          name
          completed
          displayOrder
        }
      }
    }
  `
}
