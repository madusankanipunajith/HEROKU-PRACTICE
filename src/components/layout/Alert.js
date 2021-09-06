import React from 'react'
import Modal from '../admin/modals/Modal'
import style from './Alert.module.css' 

function Alert(props) {
    return (
        <Modal onClose={props.onClose}>
            <div className={style['header']}>
                <h2>Are you sure to delete ?</h2>
            </div>
            <div className={style['body']}>
                <p>Please be sure to delete the user. because after deleting the selected user, you are unable to recover !</p>
            </div>
            <div className={style['action']}>
                <button onClick={props.onConfirm} className={style['confirm']}>Yes</button>
                <button onClick={props.onClose} className={style['discard']}>No</button>
            </div>
        </Modal>
    )
}

export default Alert
