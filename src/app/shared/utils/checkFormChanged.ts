import { FormGroup } from '@angular/forms';

export default function checkFormChange(formGroup: FormGroup, entity?: any) {
  if (entity) {
    for (const [key, control] of Object.entries(formGroup.controls)) {
      if (Array.isArray(control.value)) {
        if (
          control.value.length !== entity[key]!.length ||
          !control.value.every((id: string) =>
            (entity[key] as string[])?.includes(id)
          )
        ) {
          return true;
        }
      } else {
        if (control?.value !== entity[key]) {
          return true;
        }
      }
    }
    return false;
  } else {
    for (const [key, control] of Object.entries(formGroup.controls)) {
      if (Array.isArray(control.value)) {
        if (control.value.length !== 0) {
          return true;
        }
      } else {
        if (control?.value !== "") {
          return true;
        }
      }
    }
    return false;
  }
}
