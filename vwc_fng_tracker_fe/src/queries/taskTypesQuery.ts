export const taskTypesQuery = (): string => {
  return `
    {
      taskTypes(func:type(TaskType))@normalize {
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
