/**
 * @author Vishal
 */
import CustomTextField from "@components/textfields/CustomTextField";
import LoginPng from "@images/login.png";
import AuthLayout from "@layouts/AuthLayout";

const Login = () => {
  return (
    <AuthLayout
      imageSrc={LoginPng}
      imageOnLeft={false}
      titleText="Sign in your account"
      submitButtonText="Sign In →"
      dividerText="Sign in with"
      onSubmit={() => console.log("Submit login")}
      renderFormFields={
        <>
          <CustomTextField
            // value=""
            // onChange={() => {}}
            type="email"
            name="email"
            labelText="Email"
          />
          <CustomTextField
            type="password"
            name="password"
            labelText="Password"
            // value=""
            // onChange={() => {}}
          />
        </>
      }
    />
  );
};

export default Login;
