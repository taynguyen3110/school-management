import { SchoolSubject } from '@/app/shared/types';
import { createAction, props } from '@ngrx/store';

export const loadSubjectsSuccess = createAction(
  '[Subjects] Load Subjects Success',
  props<{
    subjects: SchoolSubject[];
    total: number;
    rowsPerPage: number;
    totalPages: number;
  }>()
); 