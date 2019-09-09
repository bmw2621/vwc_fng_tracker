export const troopGridTaskTypesQuery = () => (
  `
    {
      taskTypes(func: type(TaskListType))@normalize {
        associatedWith {
          associatedWith: name
        }
        taskType {
          uid: uid
          name: name
          displayOrder: displayOrder
        }
      }
    }
  `
)
