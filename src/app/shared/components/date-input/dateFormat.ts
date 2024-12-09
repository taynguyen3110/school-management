import { MatDateFormats } from '@angular/material/core';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'LL', // Format for input parsing
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Format for displaying in the input field
    monthYearLabel: 'MMM YYYY', // Format for month/year picker
    dateA11yLabel: 'LL', // Accessible label for the date
    monthYearA11yLabel: 'MMMM YYYY', // Accessible label for the month/year picker
  },
};
