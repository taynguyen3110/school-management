import { createReducer, on } from '@ngrx/store';
import { Teacher } from '@/app/shared/types';
import { loadTeachersSuccess } from './teacher.actions';

export interface TeachersState {
  teachers: Teacher[];
  total: number;
  rowsPerPage: number;
  totalPages: number;
  status: 'pending' | 'loaded';
}

export const initialState: TeachersState = {
  teachers: [],
  total: 0,
  rowsPerPage: 0,
  totalPages: 0,
  status: 'pending',
};

export const teachersReducer = createReducer(
  initialState,
  on(
    loadTeachersSuccess,
    (state, { teachers, total, rowsPerPage, totalPages }) => ({
      ...state,
      teachers,
      total,
      rowsPerPage,
      totalPages,
      status: 'loaded' as const,
    })
  )
); 