export const taskListTypesQuery = (): string => {
  return `
    {
      taskListTypes(func: type("TaskListType")) @normalize {
        uid: uid
        associatedWith(first: 1) {
          associatedWithUid: uid
          associatedWith: name
        }
        name: name
      }
    }
  `
}
