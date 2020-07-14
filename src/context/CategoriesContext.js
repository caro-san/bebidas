import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//Crear el context
export const CategoriesContext = createContext();

// Siempre que se crea un context se tiene que crear un provider.
//El provider es de donde van a salir los datos y las funciones.
//Provider es donde se encuentran las funciones y state
const CategoriesProvider = (props) => {

    //crear el state del context
    const [categories, saveCategories] = useState([]);

    // Ejecutar el llamado a la API
    useEffect(() =>{
        const getCategories = async () =>{
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const categories = await axios.get(url);

            saveCategories(categories.data.drinks);
        }
        getCategories();
    }, []);



    //Aqui en el return van los datos y todo lo que esta disponible para los components
    return(
        <CategoriesContext.Provider
        //aqui siempre se pone un value, y todo lo que se ponga dentro va a estar 
        //disponible para los demas components
        //El hola que se pone dentro de este value, es el mismo del state
            value={{
                categories
            }}
        >
            {props.children}
        </CategoriesContext.Provider>
    )
}

export default CategoriesProvider;