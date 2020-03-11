export const student_mail = value =>
value && value.match(/@student/) ? 
  true :
  false;