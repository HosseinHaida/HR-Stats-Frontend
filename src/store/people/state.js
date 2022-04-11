export default function () {
  return {
    excelUploadPending: false,
    peopleFetchPending: false,
    list: [],
    total: { pages: 1, count: 0 },
    insertPending: false,
    personDepartmentChangePending: false,
    findingPersonPending: false,
  };
}
