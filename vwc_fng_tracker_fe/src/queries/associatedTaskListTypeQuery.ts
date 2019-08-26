export const associatedTaskListTypeQuery = (associatedWith: string): string => {
  return `
    {
      taskList(func:eq(type, "TaskListType")) @filter(eq(associatedWith, "${ associatedWith }")) @normalize {
        tasks: hasTaskTypes {
          name: name
          displayOrder: displayOrder
          taskTypeId: uid
        }
      }
    }
  `
}
