export function applicantsQuery(): string {
  return `
    {
			applicants(func: eq(name, "Applicants")) @normalize {
				applicants: member (orderasc: lastName, orderasc: firstName) {
					uuid: uid
					expand(_all_)
				}
			}
		}
  `
}


