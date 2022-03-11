export function getUserData(state /*,getters*/) {
  return state.data;
}

export function getDepartments(state) {
  const deps = Object.assign(
    {},
    ...state.departments.map(({ label, value }) => ({
      [value]: label,
    }))
  );
  return deps;
}
