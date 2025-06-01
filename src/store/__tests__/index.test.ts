import { store, RootState, AppDispatch } from '../index';
import questionnaireReducer from '../questionnaireSlice';

describe('Redux Store', () => {
  it('should configure store with questionnaire reducer', () => {
    expect(store.getState().questionnaire).toBeDefined();
    expect(store.getState().questionnaire).toEqual(questionnaireReducer(undefined, { type: 'unknown' }));
  });

  it('should export RootState type', () => {
    const state: RootState = store.getState();
    expect(state).toBeDefined();
  });

  it('should export AppDispatch type', () => {
    const dispatch: AppDispatch = store.dispatch;
    expect(dispatch).toBeDefined();
  });
}); 