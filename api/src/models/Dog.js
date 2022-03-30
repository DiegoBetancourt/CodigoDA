const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID, // Para evitar colisiones
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING,
      validate: {
        is:  {
          args: /^[a-zA-Z\s]*$/,  //Verifica solo el uso de letras y espacios
          msg: 'Must contain letters and spaces only'
        } 
      },
      allowNull: false,
    },

    heightMin : { 
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Debe contener un número mayor que 0',
          min: 0    // Solo permite valores positivos
        },
        isGreater(value) {  //Verifica que la altura mínima no sea mayor a la máxima
          if (parseInt(value) >= parseInt(this.heightMax)) {
            throw new Error('Height Min no puede ser mayor que Height Max');
            }
          },
      },
      allowNull: false,
    },

    heightMax : { 
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Debe contener un número mayor que 0',
          min: 0  // Solo permite valores positivos
        },
        isLower(value) {  //  Verifica que la altura mínima no sea mayor a la máxima
          if (parseInt(value) <= parseInt(this.heightMin)) {
            throw new Error('Height Min no puede ser mayor que Height Max');
            }
          },
      },
      allowNull: false,
    },

    weightMin : {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Debe contener un número mayor que 0',
          min: 0  // Solo permite valores positivos
        },
        isGreater(value) {  //  Verifica que el peso mínimo no sea mayor al máximo
          if (parseInt(value) >= parseInt(this.weightMax)) {
            throw new Error('El peso mínimo no puede ser mayor que el peso máximo');
            }
          },
        min: 0  // Solo permite valores positivos
      },
      allowNull: false,
    },

    weightMax : {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Debe contener un número mayor que 0',
          min: 0  // Solo permite valores positivos
        },
        isLower(value) {  //  Verifica que el peso mínimo no sea mayor al máximo
          if (parseInt(value) <= parseInt(this.weightMin)) {
            throw new Error('El peso mínimo no puede ser mayor que el peso máximo');
            }
          },
      },
      allowNull: false,
    },

    lifespan : {
      type: DataTypes.STRING,
      validate: {
        len: [0,20],  //Restringe la cantidad de caracteres 
      },
    },

    origin : {
      type: DataTypes.STRING,
     
    },
   

    image : {
      type: DataTypes.STRING(3000),
      validate: {  //verifica la url de la imagen
        is: {
          args: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
          msg: 'Introduzca una URL válida',
        },
      },
      allowNull: true
    },

    createdInDb : {  // Se usa para el filtrado de los creados y la API
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },{timestamps: false}); 
};

