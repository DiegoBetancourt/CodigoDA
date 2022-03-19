import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, listOfTemperaments } from '../actions/index';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Card from './Card';
import Pagination from './Pagination';
import Loading from './Loading';
import SearchBar from './SearchBar';
import Nav from './Nav';


export default function Home() {
    const dispatch = useDispatch();             // mapDispatchToProps para Hooks. Crea una instancia de la función para despachar actions.
    const allDogs = useSelector((state) => state.dogs);     // mapStateToProps para Hooks. Retorna los datos de la store que se necesiten.


    /* Paginado */
    const [currentPage, setCurrentPage] = useState(1);              //pagina actual
    const [dogsPerPage] = useState(8);                              //8 perros por página
    const indexOfLastDog = currentPage * dogsPerPage;               //índice último perro
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;           //índice primer perro
    const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog);  //Perros de la página actual  Pág.1 ---> 0-7

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(listOfTemperaments());
        dispatch(getDogs());
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }


    return (
        <div className='home'>
            <h1 className='title1'>Dogs App</h1>
            <div className='head'>

            <div className='create_dog'>
                <Link to='/dog'>
                    <button className='crea'>
                        <div className="b1">
                            <div className="b2">
                                Crear Perro
                            </div>
                        </div>
                    </button>
                </Link>
            </div>
            <div className='load'>
                <Link to='/'>
                    <button className='about'>Inicio</button>
                </Link>
                <button onClick={e => handleClick(e)}
                    className='ref'>Refrescar</button>
            </div>
            </div>
            <div className='search'>
                <SearchBar />
            </div>
            <div className='navig'>
                <Nav />
            </div>
            
            <div className='cards'>
                {currentDog.length > 0 ? (
                    currentDog.map(e => {
                        return (
                            <Card
                                key={e.id}
                                id={e.id}
                                name={e.name}
                                image={e.image}
                                temperament={`Temperaments: ${e.temperament}`}
                                weightMin={`Weight Min: ${e.weightMin} kg.`}
                                weightMax={`Weight Max: ${e.weightMax} kg.`}
                            />
                        );
                    })
                ) : (
                    <div>
                        <Loading />
                    </div>
                )}
            </div>
            <div className='pagin'>
                <Pagination
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginate={paginate}
                />
            </div>

        </div>
    );
}