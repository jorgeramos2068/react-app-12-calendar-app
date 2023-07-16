import uiReducer from '../../reducers/uiReducer';
import { uiCloseModal, uiOpenModal } from '../../actions/ui';

describe('Tests in uiReducer', () => {
  const initialState = {
    modalOpen: false,
  };

  test('Should return default state', () => {
    const state = uiReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('Should open modal', () => {
    const modalOpenAction = uiOpenModal();
    const state = uiReducer(initialState, modalOpenAction);
    expect(state).toEqual({
      modalOpen: true
    });
  });

  test('Should close modal', () => {
    const modalCloseAction = uiCloseModal();
    const state = uiReducer(initialState, modalCloseAction);
    expect(state).toEqual({
      modalOpen: false
    });
  });
});