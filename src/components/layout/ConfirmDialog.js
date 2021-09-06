import React from 'react'
import { Dialog, DialogActions, DialogContent, Typography, DialogTitle, makeStyles, IconButton } from '@material-ui/core'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';

const useStyle = makeStyles(theme=>({
    dialog: {
        position: 'absolute',
        top: theme.spacing(5),
        padding: theme.spacing(2)
    },
    dialogTitle:{
        textAlign: 'center'
    },
    dialogContent:{
        textAlign: 'center'
    },
    dialogAction:{
        justifyContent:'center'
    },
    titleIcon:{
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover' : {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root':{
            fontSize: '8rem'
        }
    }
}))

function ConfirmDialog(props) {
    const {confirmDialog, setConfirmDialog} = props;
    const classes = useStyle()
    return (
        <Dialog open={confirmDialog.isOpen} classes={{paper: classes.dialog}}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <button style={{width:'50px', padding: '5px', border:'none', borderRadius: '5px', backgroundColor: 'pink', cursor: 'pointer'}} onClick={confirmDialog.onConfirm}>Yes</button>
                <button style={{width:'50px', padding: '5px', border:'none', borderRadius: '5px', backgroundColor: 'lightgreen', cursor: 'pointer'}} onClick={()=> setConfirmDialog({...confirmDialog,isOpen: false})}>No</button> 
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
