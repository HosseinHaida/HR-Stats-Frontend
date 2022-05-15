export function setSigninPending(state, status) {
  state.signinPending = status;
}

export function setUserData(state, userPayload) {
  state.data = userPayload;
}

export function setToken(state, t) {
  state.t = t;
}

export function setCookie(state, token) {
  let d = new Date();
  d.setTime(d.getTime() + 14 * 24 * 60 * 60 * 1000);
  let expires = d.toUTCString();
  document.cookie = "t=" + token + ";expires=" + expires + ";path=/";
  state.t = token;
}

export function setUserRequests(state, requests) {
  state.data.outbound_requests = requests;
}

export function setUserRequestsInbound(state, requests) {
  state.data.inbound_requests = requests;
}

export function setUserInboundRequestsCount(state, count) {
  state.inboundRequestsCount = count;
}

export function logout(state) {
  state.data = null;
  state.t = null;
  state.inboundRequestsCount = null;
  document.cookie = "t=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}

export function setDepartmentsList(state, departments) {
  state.departments = departments;
}

export function setProfilePhotoUploadPending(state, status) {
  state.profilePhotoUploadPending = status;
}
