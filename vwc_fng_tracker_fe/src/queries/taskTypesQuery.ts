export const taskTypesQuery = (): string => {
  return `
    {
      taskTypes(func:type(TaskType))(orderasc: displayOrder) @normalize {
        uid: uid
        name: name
        displayOrder: displayOrder
        ~taskType {
          taskListTypeUid: uid
        }
      }
    }
  `
}
