import { Teacher } from '@/app/shared/types';
import { createAction, props } from '@ngrx/store';

export const loadTeachersSuccess = createAction(
  '[Teachers] Load Teachers Success',
  props<{
    teachers: Teacher[];
    total: number;
    rowsPerPage: number;
    totalPages: number;
  }>()
); 