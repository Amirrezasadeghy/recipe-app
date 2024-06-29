import React from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className='flex flex-col bg-gray-50 p-5 w-80 rounded-3xl shadow-xl border-solid border-x-2 border-y-2 border-black'>

      <img className='w-full h-72 rounded-2xl object-cover border-solid border-x-2 border-y-2 border-black' src={recipe.image} alt={recipe.label} />

      <div className='flex flex-col items-center'>

        <h2 className='text-xl text-amber-500 font-medium mt-5 mb-5'>{recipe.label}</h2>

        <button 
          onClick={onClick}
          className='mt-5 text-white p-2 w-32 bg-amber-500 rounded-full shadow-lg hover:bg-amber-600 border-solid border-x-2 border-y-2 border-black'>
          View Recipe
        </button>

      </div>
      
    </div>
  );
}

export default RecipeCard;
