export default {
   all: {
      optional: '(optional)',
      placeholder: 'Example: ${1}',
      requiredError: 'Input field cannot be empty',
   },


   fieldCipher: {
      maskError: 'Value must have ${1} characters',
   },
   fieldEmail: {
      maskError: 'Email address is not valid',
   },
   fieldLink: {
      maskError: 'URL link is not valid',
      tooltip: 'Open URL',
   },
   fieldNumber: {
      minMax: 'Value must be between ${1} and ${2}',
      min: 'Value must be bigger than ${1}',
      max: 'Value must be smaller than ${1}',
   },
   fieldPassword: {
      tooltip: 'Toggle password visibility',
      strength: {
         none: 'Very weak',
         weak: 'Weak',
         good: 'Good',
         strong: 'Strong',
         secure: 'Very strong',
      },
   },
   fieldDate: {
      hint: 'Day (01) - Month (Jan) - Year (2000)',
      maskError: 'Date format must be: Day (01) - Month (Jan) - Year (2000)',
      customDatesError: 'Chosen date is not valid. Please use the calendar menu.',
      config: {
         days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
         daysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
         months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
         monthsShort: 'Jan_Feb_Mar_Apr_May_June_July_Aug_Sept_Oct_Nov_Dec'.split('_'),
         firstDayOfWeek: 1,
      },
      tooltip: 'Open date picker',
   },
   fieldFileUpload: {
      tooltipPickFiles: 'Open file picker',
      tooltipRemoveFiles: 'Remove all files',
      tooltipRemoveFile: 'Remove file',
   },
   groupRadio: {
      requiredError: 'An option must be selected',
   },
   groupCheckbox: {
      requiredError: 'One or more options must be selected',
   },
   slider: {
      requiredError: 'A value must be selected',
   },


   buttonSubmit: {
      loading: 'Sending...',
   },
};
