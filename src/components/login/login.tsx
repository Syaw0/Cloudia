import useFetch from "../../hooks/useFetch";
import checkLoginForm, { loaderMsg } from "../../utils/checkLoginForm";
import { ChangeEvent, useState } from "react";
import Button from "../button/button";
import PasswordInput from "../input/password/passwordInput";
import TextInput from "../input/text/textInput";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./login.module.css";
import checkInputsEmptiness from "../../utils/checkInputEmptiness";
import checkEmailForm from "../../utils/checkEmailForm";
import checkPasswordValidity from "../../utils/checkPasswordValidity";

const LoginForm = () => {
  const [trigger, state, msg, setMsg] = useFetch(checkLoginForm, loaderMsg);

  const [inputDate, setInputDate] = useState({
    loginForm_emailInput: "",
    loginForm_passwordInput: "",
  });

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputDate((s) => ({ ...s, [name]: value }));
  };

  const forgetPassword = () => {
    //navigate to forgetPasswordComponent
  };
  const createAccount = () => {
    //navigate to create Account component
  };
  const next = async () => {
    if (!checkInputs()) {
      return;
    }
    const res = await trigger();
    if (res.status) {
      // navigate to the 2 way authentication
    }
  };

  const checkInputs = () => {
    if (!checkInputsEmptiness(inputDate)) {
      return setMsg("error", "please fill all fields");
    }
    if (!checkEmailForm(inputDate.loginForm_emailInput)) {
      return setMsg("error", "email is not valid");
    }
    if (!checkPasswordValidity(inputDate.loginForm_passwordInput)) {
      return setMsg("error", "please use 5 or more Character for password");
    }
    return true;
  };
  return (
    <div data-testid="loginForm" className={style.holder}>
      <Text className={style.headlineTypography} variant="headline4-5">
        Welcome Back
      </Text>
      <Text className={style.subheadTypography}>
        let`s fill inputs to log in to your account
      </Text>

      <TextInput
        testId="loginForm_emailInput"
        type="email"
        id="loginForm_emailInput"
        label="Email Address"
        placeholder="Please write your email address "
        name="loginForm_emailInput"
        value={inputDate.loginForm_emailInput}
        onChange={handleChanges}
      />
      <div>
        <PasswordInput
          testId="loginForm_passwordInput"
          id="loginForm_passwordInput"
          label="Password"
          placeholder="Please write your account password "
          name="loginForm_passwordInput"
          value={inputDate.loginForm_passwordInput}
          onChange={handleChanges}
        />
        <Text
          onClick={forgetPassword}
          variant="subhead2"
          testid="loginForm_forgetPasswordButton"
          className={style.forgetPassword}
        >
          forget password?
        </Text>
      </div>

      <div className={style.buttonHolder}>
        <Button
          onClick={createAccount}
          testid="loginForm_createAccountButton"
          variant="shadow"
        >
          Create Account
        </Button>
        <Button
          loader={state == "loader"}
          onClick={next}
          testid="loginForm_nextButton"
        >
          Next
        </Button>
      </div>
      <Message type={state} msg={msg} />
    </div>
  );
};

export default LoginForm;
