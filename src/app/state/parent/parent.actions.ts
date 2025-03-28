import { Parent } from '@/app/shared/types';
import { createAction, props } from '@ngrx/store';

export const loadParentsSuccess = createAction(
  '[Parents] Load Parents Success',
  props<{
    parents: Parent[];
    total: number;
    rowsPerPage: number;
    totalPages: number;
  }>()
); 