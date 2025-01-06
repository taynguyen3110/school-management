import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StudentsState } from './student.reducer';

export const selectStudentsState = createFeatureSelector<StudentsState>('students');

export const selectAllStudents = createSelector(
  selectStudentsState,
  (state) => state
);
