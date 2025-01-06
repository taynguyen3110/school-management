import { createReducer, on } from '@ngrx/store';
import { Student } from '@/app/shared/types';
import { loadStudentsSuccess } from './student.actions';

export interface StudentsState {
  students: Student[];
  total: number;
  rowsPerPage: number;
  totalPages: number;
  status: 'pending' | 'loaded';
}

export const initialState: StudentsState = {
  students: [],
  total: 0,
  rowsPerPage: 0,
  totalPages: 0,
  status: 'pending',
};

export const studentsReducer = createReducer(
  initialState,
  on(
    loadStudentsSuccess,
    (state, { students, total, rowsPerPage, totalPages }) => ({
      ...state,
      students,
      total,
      rowsPerPage,
      totalPages,
      status: 'loaded' as const,
    })
  )
);
