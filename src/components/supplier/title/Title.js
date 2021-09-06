import React from 'react';
import style from './Title.module.css';

function Title(props) {
    return (
        <div className={style["main-title"]}>
            <img src={props.image} alt="hello"/>
            <div className={style["main-greeting"]}>
                <h1>{props.greet}</h1>
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default Title
