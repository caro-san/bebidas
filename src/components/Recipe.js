import React, { useState, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Recipe = ({recipe}) => {

    //material-ui modal setting
    const [ modalStyle] = useState(getModalStyle);
    const [ open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };


    //extract the context values
    const { infoRecipe, saveIdRecipe, saveRecipe } = useContext(ModalContext);

    //Displays and formats ingredients and their quantities
    const showIngredients = infoRecipe =>{
        let ingredients = [];
        for(let i = 1; i < 16; i++){
            if(infoRecipe[`strIngredient${i}`]){
                ingredients.push(
                <li>{infoRecipe[`strIngredient${i}`]} {infoRecipe[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredients;
    }


    return ( 
        <div className="col-sm-12 col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{recipe.strDrink}</h2>
                <img className="card-img-top" src={recipe.strDrinkThumb} alt={`Image of ${recipe.strDrink}`}
                />
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() =>{
                            saveIdRecipe(recipe.idDrink)
                            handleOpen();
                        }}
                    >
                        See Recipe
                    </button>

                    <Modal
                        open={open}
                        onClose={() =>{
                            saveIdRecipe(null);
                            saveRecipe({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{infoRecipe.strDrink}</h2>
                            <h3 className="mt-4">Instructions</h3>
                            <p>
                                {infoRecipe.strInstructions}
                            </p>
                            <img className="img-fluid my-4" src={infoRecipe.strDrinkThumb}
                            />

                            <h3>Ingredients and Quantities</h3>
                            <ul>
                            {showIngredients(infoRecipe)}
                            </ul>
                        </div>
                    </Modal>


                </div>
            </div>
        </div>
    );
}

export default Recipe;