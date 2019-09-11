export const troopGridTaskTypesQuery = () => (
  `
    {
      taskTypes(func: type(TaskListType)) @normalize {
        associatedWith {
          associatedWith: name
        }
        taskType (orderasc: displayOrder){
          uid: uid
          name: name
          displayOrder: displayOrder
        }
      }
    }
  `
)
