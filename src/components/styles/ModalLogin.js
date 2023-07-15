import { makeStyles } from '@material-ui/core/styles'

export const modalLoginStyle = makeStyles(theme => (
    {
    modal: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    loginBtn: {
        position: 'fixed !important',
        top: '12px',
        right: '12px',
    },
    logoutBtn: {
        position: 'fixed !important',
        top: '12px',
        right: '12px',
    },
    boxLogin: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        padding: '8px',
    }
}))