import React from 'react';
import '../styles/Loading.css';
import loading from '../images/loading.gif'

export default function Loading(){
    return (
        <div className='loader'>
            <img src={loading} className='loading' alt="loading" />
        </div>
        );
};