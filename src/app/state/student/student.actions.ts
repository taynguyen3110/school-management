import { Student } from '@/app/shared/types';
import { createAction, props } from '@ngrx/store';

// export const loadStudents = createAction('[Students] Load Students');
export const loadStudentsSuccess = createAction(
  '[Students] Load Students Success',
  props<{
    students: Student[];
    total: number;
    rowsPerPage: number;
    totalPages: number;
  }>()
);
