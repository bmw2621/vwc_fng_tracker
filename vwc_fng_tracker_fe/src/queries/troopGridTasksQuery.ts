export const troopGridTasksQuery =
  (personType: string): string => (
  `
    {
      troops(func: type(${ personType })) {
        uid
        tasks: task (orderasc: displayOrder){
          uid
          expand(_all_)
        }
      }
    }
  `
)
