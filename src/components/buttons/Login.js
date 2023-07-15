import { modalLoginStyle } from "../styles/ModalLogin"
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

function LoginAuth() {
    const classes = modalLoginStyle();
    const { loginWithRedirect } = useAuth0();
  
    return (
        <Button className={classes.loginBtn} variant="contained" onClick={() => loginWithRedirect()}>Log In</Button>
    )
}

export default LoginAuth;