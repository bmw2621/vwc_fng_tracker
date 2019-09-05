export const taskListTypesQuery = (): string => {
  return `
    {
      taskListTypes(func:eq(type, "TaskListType")) {
        uid
        associatedWith
        name
        taskTypes: hasTaskTypes(orderasc: displayOrder) {
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
