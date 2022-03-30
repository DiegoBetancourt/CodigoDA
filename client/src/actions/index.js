import axios from 'axios';

//Esta accion que permite renderizar todos los perros en el Home, aca se conecta el front y el back

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}



//accion que permite renderizar todos los temperamentos en Home

export function listOfTemperaments(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/temperament');
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
}



//accion que permite filtrar los temperamentos

export function filterByTemp(payload){
    return{
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}


//accion que permite filtrar el origen de los perros (API, DB)

export function filterByCreated(payload){
    return{
        type: 'FILTER_BY_CREATED',
        payload
    }
}



//accion que permite ordenar alfabéticamente por nombre

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}



//accion que permite ordenar peso de menor a mayor y viceversa

export function orderByWeight(payload){
    return{
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}



//accion que busca perros por nombre 

export function getNameDogs(name){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/dogs?name=' + name);
            return dispatch({
                type: 'GET_DOGS_NAME',
                payload: json.data
            })
        } catch(error){
            console.log(error.message);
            return alert('Raza no encontrada')
        }
    }
}



//accion que recibe la info con el perro a crear

export function postDog(payload){
    return async function(){
        var json = await axios.post('http://localhost:3001/dog', payload);
        return json;
    }
}


//accion que recibe la info con los detalles del perro 

export function getDetails(id){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/dogs/' + id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        }catch(error){
            console.log(error)
            return alert('Perro no encontrado')
        }
    }
}
