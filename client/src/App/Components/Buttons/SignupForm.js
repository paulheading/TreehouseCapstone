import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { createRoute } from "../../modules/helpers";

export default function SignupFormButton({
  firstName,
  lastName,
  emailAddress,
  password,
  setCurrentUser,
  setIsFirstTime,
  setErrorMsgs,
}) {
  const history = useHistory();
  const closeSignup = useCallback(() => history.push("/"), [history]);

  async function doSignup(e) {
    e.preventDefault();
    let newUser = await createRoute("users", {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value,
      level: "free",
    });
    if (!newUser.errors) {
      setCurrentUser(newUser);
      setIsFirstTime(true);
      closeSignup();
    } else {
      setErrorMsgs(newUser.errors);
    }
  }
  return (
    <Button block size="md" variant="primary" type="submit" onClick={doSignup}>
      Sign up
    </Button>
  );
}
