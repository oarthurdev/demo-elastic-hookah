import { makeStyles } from '@material-ui/core/styles'

export const SearchBarStyle = makeStyles(theme => (
    console.log(theme.breakpoints.values),
    {
    inputSearch: {
        flexGrow: 1,
        maxWidth: theme.breakpoints.values.lg,
        width: '1000px !important'
    }
}))