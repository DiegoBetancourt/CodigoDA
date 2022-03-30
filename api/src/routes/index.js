const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { getAllDogs, getDogsfromApi } = require('./controllers.js')


//RUTAS

router.get('/dogs', async (req, res) => {
    const { name } = req.query;
    try{
        let dogsTotal = await getAllDogs();
        if(name) {
            let dogName = await dogsTotal.filter(e => e.name.
                toLowerCase().includes(name.toLowerCase()));
            dogName.length ? 
            res.status(200).send(dogName):
            res.status(404).send('No existe un perro con este nombre');
        } else {
            res.status(200).send(dogsTotal)
        }
    } catch(error){
        console.log(error);
    }
});




router.get('/dogs/:idRaza', async (req, res) => {
    const idRaza = req.params.idRaza;
    try {
        let dogsTotal = await getAllDogs();
        if(idRaza){
            let dogId = await dogsTotal.filter(e => e.id == idRaza);
            dogId.length ? 
                res.status(200).json(dogId) :
                res.status(404).send('No existe un perro con este id.')
        } else {
            res.status(200).send(dogsTotal)
        }
    } catch(error){
        console.log(error);
    }
})



router.get('/temperament', async (req, res) => {
        try{
            const apiTemp = await getDogsfromApi();
                        
            const temperaments = await apiTemp.map(e =>
            (e.temperament)); 

                   
            // El método flat, crea un nuevo arreglo con TODOS los elementos concatenados
            
            const arrayTemp = temperaments.map((temp) => 
            (temp ? temp.split(', ') : null)).flat();
            
                        
            const temperamentUnique = [...new Set(arrayTemp)];
                        
            temperamentUnique.filter(temp => temp !== null).forEach(
                async (temp) => await Temperament.findOrCreate({
                    where: {temperament: temp},
                })
            );
            const allTemperaments = await Temperament.findAll({
                order: [["temperament", "ASC"]],
            });
            res.send(allTemperaments);
        } catch (error){
            console.log(error);
        }
});


router.post('/dog', async (req, res) => {
    let { name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        lifespan, 
        temperament,
        image, 
        createdInDb } = req.body;

    if(!image){          
        image = 'https://media.istockphoto.com/vectors/dog-black-silhouette-isolated-on-white-background-sitting-pet-simple-vector-id1265211191?k=20&m=1265211191&s=612x612&w=0&h=S3FTUJHcxDTP5dp_qRWwmd51djcS3JOEEl_hXLIQj3g=';
    }

    if(name && heightMin && heightMax && weightMin &&
        weightMax && lifespan && temperament && image){
            let dogCreated = await Dog.create({   // Se crea la nueva raza de perro
                name: name,
                heightMax: parseInt(heightMax),
                heightMin: parseInt(heightMin),
                weightMax: parseInt(weightMax),
                weightMin: parseInt(weightMin),
                lifespan: lifespan,
                image: image,
                createdInDb: createdInDb,
            })

            // Temperamentos selecionado por el usuario
            let temperamentDB = await Temperament.findAll({ 
                where: {temperament : temperament },
            });
            dogCreated.addTemperament(temperamentDB);  // Se agregan los temperamentos al perro creado
            res.status(200).send('Perro creado con exito');

    } else{
        res.status(404).send('Complete todos los campos')
    }
});



module.exports = router;
