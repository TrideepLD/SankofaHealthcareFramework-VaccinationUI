import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Checkbox, Form, TextInput } from "carbon-components-react";
import { ArrowRight16 } from "@carbon/icons-react";

import { loginUser } from "../../reducers/authenticatedUserReducer";

/*
  Import and utilise service when integrating API
  import loginService from "../../services/loginServices";
*/

//Sample user data
import users from "../../sampleData/users";

/*
  Login Screen

  Display form for logging into the application and handle authentication process

*/

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const dispatch = useDispatch();

  //On submission handle login
  const handleSubmit = (e) => {
    e.preventDefault();
    return login ? handleLogin() : handleIDInput();
  };

  //Basic form validation - Progression to password input
  const handleIDInput = () => {
    if (id.endsWith("@ibm.com")) {
      setInvalidInput(false);
      setLogin(true);
    } else {
      setInvalidInput(true);
    }
  };

  //Authenticate user based on form input
  const handleLogin = () => {
    const user = users.filter((u) => u.id === id)[0];
    if (!user || user.password !== password) {
      setId(null);
      setLogin(false);
    } else {
      setLogin(false);
      dispatch(loginUser(user));

      /*
      To be implemented when the API layer has been finalised
       loginService.login(id, password)
      .then((data) => {
        
      }).catch((error) => {
        setId(null);
        setLogin(false);
      })*/
    }
    setId("");
    setPassword("");
  };

  return (
    <div className="bx--grid bx--grid--full-width login-page">
      <div className="bx--row">
        <div className="bx--col-md-8 bx--col-lg-6">
          <h2 className="login-page__heading">Log in</h2>
          <span className="login-page__text">Don't have an account? </span>
          <a href="#">Create an IBMid</a>
          <Form className="login-page__form" onSubmit={(e) => handleSubmit(e)}>
            {!login ? (
              <TextInput
                id="userid"
                invalidText="A valid email address is required"
                labelText="Continue with ID"
                placeholder="username@ibm.com"
                value={id}
                onChange={(e) => setId(e.target.value)}
                invalid={invalidInput}
              />
            ) : (
              <TextInput.PasswordInput
                id="password"
                invalidText="Password incorrect"
                labelText="Enter your password"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}

            <div className="login-page__button-container">
              <Button
                className="login-page__button"
                kind="primary"
                renderIcon={ArrowRight16}
                type="submit"
              >
                Continue
              </Button>
            </div>
          </Form>
          <Checkbox defaultChecked labelText="Remember ID" id="remember-ID" />
        </div>
        <div className="bx--col-med-4 bx--col-lg-10">
          <img
            className="login-page__image"
            src={"https://pngimg.com/uploads/ibm/ibm_PNG19662.png"}
            alt="Carbon illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
