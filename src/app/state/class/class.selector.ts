import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ClassesState } from './class.reducer';

export const selectClassesState = createFeatureSelector<ClassesState>('classes');

export const selectAllClasses = createSelector(
  selectClassesState,
  (state) => state
); 