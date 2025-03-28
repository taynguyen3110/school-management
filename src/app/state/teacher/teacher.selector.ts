import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TeachersState } from './teacher.reducer';

export const selectTeachersState = createFeatureSelector<TeachersState>('teachers');

export const selectAllTeachers = createSelector(
  selectTeachersState,
  (state) => state
); 