import { createReducer, on } from '@ngrx/store';
import { Parent } from '@/app/shared/types';
import { loadParentsSuccess } from './parent.actions';

export interface ParentsState {
  parents: Parent[];
  total: number;
  rowsPerPage: number;
  totalPages: number;
  status: 'pending' | 'loaded';
}

export const initialState: ParentsState = {
  parents: [],
  total: 0,
  rowsPerPage: 0,
  totalPages: 0,
  status: 'pending',
};

export const parentsReducer = createReducer(
  initialState,
  on(
    loadParentsSuccess,
    (state, { parents, total, rowsPerPage, totalPages }) => ({
      ...state,
      parents,
      total,
      rowsPerPage,
      totalPages,
      status: 'loaded' as const,
    })
  )
); 