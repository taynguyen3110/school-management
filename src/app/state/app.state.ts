import { StudentsState } from './student/student.reducer';
import { ParentsState } from './parent/parent.reducer';
import { TeachersState } from './teacher/teacher.reducer';
import { SubjectsState } from './subject/subject.reducer';
import { ClassesState } from './class/class.reducer';

export interface AppState {
  students: StudentsState;
  parents: ParentsState;
  teachers: TeachersState;
  subjects: SubjectsState;
  classes: ClassesState;
}
