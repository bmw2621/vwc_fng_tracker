export const troopGridTasksQuery =
  (personType: string): string => (
  `
    {
      troops(func: eq(personType, "${ personType }")) {
        uid
        tasks: hasCompletedTask(orderasc: displayOrder){
          uid
          expand(_all_)
        }
      }
    }
  `
)
