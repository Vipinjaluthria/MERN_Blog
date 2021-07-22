import {
  Avatar,
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
} from "@material-ui/core";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./input";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import Icon from "./icon";
import { signin, signup } from "../../actions/auth";
const initialstate = {
  firstname: "",
  lastname: "",
  password: "",
  email: "",
  confirmPassword: "",
};
const Auth = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const History = useHistory();
  const [isSignUp, setSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialstate);
  const submitHandler = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, History));
    } else {
      dispatch(signin(formData, History));
    }
  };
  const handler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const SwitchMode = () => {
    setSignUp(!isSignUp);
    handleShowPassword(false);
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenObj;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      History.push("/");
    } catch (e) {}
    //console.log(res);
  };
  const googleFailure = (error) => {
    console.log("Google SigIn Failed :", error);
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignUp == true ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={submitHandler}>
            <Grid container spacing={3}>
              {isSignUp && (
                <>
                  <Input
                    name="firstname"
                    label="First Name"
                    handleChange={handler}
                    autofocus={true}
                    half
                  />
                  <Input
                    name="lastname"
                    label="Last Name"
                    handleChange={handler}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email"
                handleChange={handler}
                type={"email"}
              />
              <Input
                name="password"
                label="Password"
                handleChange={handler}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handler}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignUp ? "SignUp" : "SignIn"}
            </Button>
            <GoogleLogin
              clientId="1082847824251-4seq8cjblp98tottodofpketj4h69g5j.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  variant="contained"
                  startIcon={<Icon />}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Google SignIn
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={SwitchMode}>
                  {isSignUp ? "Already Have an Account ?" : "Create Account"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Auth;
