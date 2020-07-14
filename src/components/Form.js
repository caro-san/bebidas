import React, { useContext, useState } from 'react';
import { CategoriesContext } from '../context/CategoriesContext';
import { RecipesContext } from '../context/RecipesContext';

const Form = () => {

    const [search, saveSearch] = useState({
        name: '',
        category: ''
    })

    const { categories } = useContext(CategoriesContext);
    const { searchRecipes, saveConsult } = useContext(RecipesContext);

    //Funcion para leer los contenidos
    const getRecipeData = e => {
        saveSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    return (
        <form
            className="col-12"
            onSubmit={e => {
                e.preventDefault();
                searchRecipes(search)
                saveConsult(true);
            }}
        >
            <fieldset className="text-center">
                <legend>Search for drinks by category or ingredient</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Search by Ingredient"
                    onChange={getRecipeData}
                    />
                </div>

                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="category"
                        onChange={getRecipeData}
                    >
                        <option value=""> - Select Category - </option>
                        {categories.map(category => (
                            <option 
                                key={category.strCategory}
                                value={category.strCategory}
                            >{category.strCategory}</option>
                        ))}

                    </select>
                </div>

                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Look for Cocktails"
                    />
                </div>


            </div>
        </form>

    );
}

export default Form;