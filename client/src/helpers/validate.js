export const isStudent = value =>
value && value.match(/@student/) ? 
  true :
  false;

export const isKhai_mail = value => 
value && value.match(/.khai/) ?
  true :
  false;

export const isAdmin = value => 
value && value.match(/^admin$/) ?
  true :
  false;