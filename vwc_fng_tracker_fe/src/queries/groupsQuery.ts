export function groupsQuery(): string {
  return `
    {
      groups(func: eq(type, "group")){
      uid
      name
        }
    }
  `
}
