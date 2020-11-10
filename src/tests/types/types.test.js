import types from '../../types/types';

describe('Tests in types file', () => {
  test('Should check declared types', () => {
    const localTypes = {
      uiOpenModal: '[ui] Open modal',
      uiCloseModal: '[ui] Close modal',
    
      eventSetActive: '[event] Set active',
      eventLogout: '[event] Logout',
      eventStartAddNew: '[event] Start add new',
      eventAddNew: '[event] Add new',
      eventClearActive: '[event] Clear active',
      eventUpdate: '[event] Update event',
      eventDelete: '[event] Delete event',
      eventLoadAll: '[event] Load all',
    
      authChecking: '[auth] Checking login state',
      authStartLogin: '[auth] Start login',
      authLogin: '[auth] Login',
      authStartRegister: '[auth] Start register',
      authStartRenewToken: '[auth] Start renew token',
      authLogout: '[auth] Logout'
    };
    expect(types).toEqual(localTypes);
  });
});
