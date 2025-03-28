import { createReducer, on } from '@ngrx/store';
import { Classes } from '@/app/shared/types';
import { loadClassesSuccess } from './class.actions';

export interface ClassesState {
  classes: Classes[];
  total: number;
  rowsPerPage: number;
  totalPages: number;
  status: 'pending' | 'loaded';
}

export const initialState: ClassesState = {
  classes: [],
  total: 0,
  rowsPerPage: 0,
  totalPages: 0,
  status: 'pending',
};

export const classesReducer = createReducer(
  initialState,
  on(
    loadClassesSuccess,
    (state, { classes, total, rowsPerPage, totalPages }) => ({
      ...state,
      classes,
      total,
      rowsPerPage,
      totalPages,
      status: 'loaded' as const,
    })
  )
); 