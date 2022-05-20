export function isNameValid(name) {
  const nameRegex = RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "g");
  return name.match(nameRegex);
}

export function isEmailValid(email) {
  const emailRegex = RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
    "g"
  );
  return email.match(emailRegex);
}

export function isPasswordValid(password) {
  const passRegex = RegExp(
    "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.])(?=\\S+$).{8,}",
    "g"
  );
  return password.match(passRegex);
}

export function isUsernameValid(username) {
  const usernameRegex = RegExp("(?=.*[0-9])(?=.*[a-z])(?=\\S+$).{5,}", "g");
  return username.match(usernameRegex);
}
