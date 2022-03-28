import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage (){
    return(
        <div className='title'>
            <div className='title2'>
            <h1 className='intro'>Bienvenido a la Dogs App</h1>
            <Link to='/home'>
                <button className='bot'style={{cursor: 'pointer'}}>Ingresar</button>
            </Link>
            </div>
        </div>
    );
}
