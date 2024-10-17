import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function appointmentEndValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    let isInvalid: boolean = true;

    if (control.value.endTime.hour > control.value.startTime.hour) {
      isInvalid = false;
    } else if (control.value.endTime.hour === control.value.startTime.hour) {
      if (control.value.endTime.minute > control.value.startTime.minute) {
        isInvalid = false;
      }
    }

    if (!isInvalid) {
      return null
    } else {
      return { isInvalid: true }
    }
  }
}
