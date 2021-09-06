import React from 'react'
import style from './Home.module.css';
import Title from '../../title/Title';
import Footer from '../../footer/Footer';

function Home(props) {
    return (
    
        <div className={`${style['main']}`}>
            <div className={style['main-container']}>
                <Title image={props.img} greet="Hello Madusanka" description="This is your dashboard"/>
                
                
            </div>
            <Footer/>
        </div>
        
    )
}

export default Home
