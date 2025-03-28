import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ParentsState } from './parent.reducer';

export const selectParentsState = createFeatureSelector<ParentsState>('parents');

export const selectAllParents = createSelector(
  selectParentsState,
  (state) => state
); 