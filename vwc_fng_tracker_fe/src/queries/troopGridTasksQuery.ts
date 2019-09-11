export const troopGridTasksQuery =
  (personType: string): string => (
  `
    {
      troops(func: type(${ personType })) {
        uid
        tasks: task {
          uid
          name
          completed
          completedDate
        }
      }
    }
  `
)
