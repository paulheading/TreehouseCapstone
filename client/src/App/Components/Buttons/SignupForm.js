import React, { useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { currentUser, firstTime } from "../../../actions";
import { createRoute } from "../../modules/helpers";

function SignupFormButton({
  firstName,
  lastName,
  emailAddress,
  password,
  currentUser,
  firstTime,
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
      currentUser(newUser);
      firstTime(true);
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

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { currentUser, firstTime })(
  SignupFormButton
);
