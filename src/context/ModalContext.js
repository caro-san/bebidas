import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

//crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {

    // state del provider
    const [idrecipe, saveIdRecipe] = useState(null);
    const [infoRecipe, saveRecipe] = useState({});

    // una vez que tenemos una receta, llamar la api
    useEffect(() =>{
        const getRecipe = async () => {
            if(!idrecipe) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idrecipe}`;

            const result = await axios.get(url);

            saveRecipe(result.data.drinks[0]);
        }
        getRecipe();

    }, [idrecipe]);

    return(
        <ModalContext.Provider
            value={{
                infoRecipe,
                saveIdRecipe,
                saveRecipe
            }}
        >
            {props.children}
        </ModalContext.Provider>

    );
}

export default ModalProvider;