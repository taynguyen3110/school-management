import { Classes } from '@/app/shared/types';
import { createAction, props } from '@ngrx/store';

export const loadClassesSuccess = createAction(
  '[Classes] Load Classes Success',
  props<{
    classes: Classes[];
    total: number;
    rowsPerPage: number;
    totalPages: number;
  }>()
); 