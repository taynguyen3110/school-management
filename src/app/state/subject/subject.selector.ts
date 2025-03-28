import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SubjectsState } from './subject.reducer';

export const selectSubjectsState = createFeatureSelector<SubjectsState>('subjects');

export const selectAllSubjects = createSelector(
  selectSubjectsState,
  (state) => state
); 