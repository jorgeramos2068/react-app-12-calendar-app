const types = {
  uiOpenModal: '[ui] Open modal',
  uiCloseModal: '[ui] Close modal',

  setActiveEvent: '[event] Set active',
  addNewEvent: '[event] Add new',
  clearActiveEvent: '[event] Clear active',
  updateEvent: '[event] Update event',
  deleteEvent: '[event] Delete event',

  authChecking: '[auth] Checking login state',
  authFinishChecking: '[auth] Finish checking login state',
  authStartLogin: '[auth] Start login',
  authLogin: '[auth] Login',
  authStartRegister: '[auth] Start register',
  authStartRenewToken: '[auth] Start renew token',
  authLogout: '[auth] Logout'
};

export default types;
