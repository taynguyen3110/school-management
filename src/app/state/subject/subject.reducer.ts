import { createReducer, on } from '@ngrx/store';
import { SchoolSubject } from '@/app/shared/types';
import { loadSubjectsSuccess } from './subject.actions';

export interface SubjectsState {
  subjects: SchoolSubject[];
  total: number;
  rowsPerPage: number;
  totalPages: number;
  status: 'pending' | 'loaded';
}

export const initialState: SubjectsState = {
  subjects: [],
  total: 0,
  rowsPerPage: 0,
  totalPages: 0,
  status: 'pending',
};

export const subjectsReducer = createReducer(
  initialState,
  on(
    loadSubjectsSuccess,
    (state, { subjects, total, rowsPerPage, totalPages }) => ({
      ...state,
      subjects,
      total,
      rowsPerPage,
      totalPages,
      status: 'loaded' as const,
    })
  )
); 