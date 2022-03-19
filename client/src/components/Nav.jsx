import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, listOfTemperaments, filterByTemp, filterByCreated,
    orderByName, orderByWeight } from '../actions/index';
import Loading from './Loading';
import '../styles/Nav.css';

export default function Nav(){
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments); 
    const [, setCurrentPage] = useState(1);

    useEffect (() => {
        dispatch(listOfTemperaments());
        dispatch(getDogs());
    }, [dispatch]);

    function handleFilterByCreated(e){
        e.preventDefault();
        dispatch(filterByCreated(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterByTemp(e){
        e.preventDefault();
        dispatch(filterByTemp(e.target.value));
        setCurrentPage(1);
    }

    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
    }

    function handleOrderByWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
    }

    return(
        <div className='filtros'>
            <h1 className='titleOrd'>Ordenar por:</h1>
            {/* filtro por peso */}
            <select className='peso' onChange={(e) => handleOrderByWeight(e)}> 
                <option defaultValue value='All'>Peso</option>
                <option value='asc_p'>Ascendente</option>
                <option value='desc_p'>Descendente</option>
            </select>
            {/* filtro por raza */}
            <select className='alfab' onChange={(e) => handleOrderByName(e)}> 
                <option defaultValue value='All'>Nombre</option>
                <option value='asc_alf'>A-Z</option>
                <option value='desc_alf'>Z-A</option>
            </select>
            {/* filtro por temperamento */}
            <select className='temper' onChange={(e) => handleFilterByTemp(e)}>
                <option value='All'>Temperamento</option>
                {temperaments.length > 0 ? (
                    temperaments.map(e => {
                        return (
                            <option value={e.temperament}
                            key={e.temperament}
                            >{e.temperament}</option>
                        )
                    })
                ) : (
                        <div>
                            <Loading/>
                        </div>
                )};
            </select>
            {/* filtro por origen (API, DB) */}
            <select className='todos' onChange={(e) => handleFilterByCreated(e)}>
                <option defaultValue value='all_dogs'>Todos los perros</option>
                <option value='dog_api'>API</option>
                <option value='dog_db'>Base de Datos</option>
            </select>
        </div>
    )
}