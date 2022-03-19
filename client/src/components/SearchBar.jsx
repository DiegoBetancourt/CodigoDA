import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameDogs } from '../actions/index';
import '../styles/SearchBar.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        if(name.length === 0){
            return alert('Entre un nombre valido')
        } else {
            dispatch(getNameDogs(name));
            setName('');
        }
    };

    return (
        <div className='barra'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className='bus'
                    type = 'text'
                    placeholder= 'Buscar por nombre...'
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <button className='botn' type='submit'
                onClick={(e) => handleSubmit(e)}>Buscar</button>
            </form>
        </div>
    );


}