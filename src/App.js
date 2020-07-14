import React, { Fragment } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import RecipesList from './components/RecipesList';

import CategoriesProvider from './context/CategoriesContext';
import RecipesProvider from './context/RecipesContext';
import ModalProvider from './context/ModalContext';


function App() {
  return (

    //El componente principal debe ser el context y que rodee a los demas
    //para que todo dentro de ese componente este disponible para los demas
    <CategoriesProvider>
      <RecipesProvider>
        <ModalProvider>
          <Header />

          <div className="container mt-5">
            <div className="row">
              <Form/>
            </div>
            <RecipesList/>

          </div>
        </ModalProvider>
      </RecipesProvider>
    </CategoriesProvider>
  );
}

export default App;
