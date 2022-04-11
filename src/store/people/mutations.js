export function setExcelUploadPending(state, status) {
  state.excelUploadPending = status;
}

export function setPeopleFetchPending(state, status) {
  state.peopleFetchPending = status;
}

export function setPeopleList(state, list) {
  state.list = list;
}

export function setPeopleListTotals(state, { pages, count }) {
  state.total = { pages: Number(pages), count: Number(count) };
}

export function setInsertPending(state, status) {
  state.insertPending = status;
}

export function setPersonDepartmentChangePending(state, status) {
  state.personDepartmentChangePending = status;
}

export function setFindingPersonPending(state, status) {
  state.findingPersonPending = status;
}
