import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "react-modal";

import RecipeCard from "../components/recipeCard";
import SearchBar from "../components/searchBar";
import LoadMore from "../components/LoadMore";

import { fetchRecipes } from "../utils/api";

Modal.setAppElement('#root');

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setRecipes([]);
      setTotalPages(1);
      setCurrentPage(1);
    }
  }, [searchQuery]);

  const handleSearch = async (page = 1) => {
    if (searchQuery.trim() === '') {
      setError('Please enter a search query');
      setRecipes([]);
      setTotalPages(1);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await fetchRecipes(searchQuery, page);
      if (data.hits.length === 0) {
        setError('No recipes found for the given search query');
        setRecipes([]);
        setTotalPages(1);
      } else {
        if (page === 1) {
          setRecipes(data.hits.map(hit => hit.recipe));
        } else {
          setRecipes(prevRecipes => [...prevRecipes, ...data.hits.map(hit => hit.recipe)]);
        }
        setTotalPages(Math.ceil(data.count / 8));
      }
    } catch (err) {
      setError('An error occurred while fetching recipes. Please try again.');
      setRecipes([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
      setCurrentPage(page);
    }
  };

  const handleLoadMore = () => {
    handleSearch(currentPage + 1);
  };

  const handleSeeLess = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setRecipes(prevRecipes => prevRecipes.slice(0, newPage * 8));
      setCurrentPage(newPage);
    }
  };

  const closeModal = () => {
    setError('');
    setSelectedRecipe(null);
  };

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
  };  

  return (
    <div className='container mx-auto p-4 flex flex-col items-center'>
      <div className='flex flex-col items-center mt-72 mb-12'>
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={() => handleSearch(1)}
        />

        {loading && (
          <div className='flex items-center justify-center mt-24'>
            <ClipLoader color={"#FF8800"} loading={loading} size={50} />
          </div>
        )}
      </div>
      
      <Modal
        isOpen={!!error}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-3xl p-6 max-w-md mx-auto border-solid border-x-2 border-y-2 border-black">
          <h2 className="text-xl font-semibold mb-4">Error</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={closeModal}
            className="bg-amber-500 hover:bg-amber-600 transition-all text-white font-bold py-2 px-4 rounded-full border-solid border-x-2 border-y-2 border-black"
          >
            Close
          </button>
        </div>
      </Modal>

      {selectedRecipe && (
        <Modal
          isOpen={!!selectedRecipe}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-3xl p-6 max-w-lg mx-auto border-solid border-x-2 border-y-2 border-black">
            <h2 className="text-2xl font-semibold mb-4">{selectedRecipe.label}</h2>
            <img src={selectedRecipe.image} alt={selectedRecipe.label} className="w-full mb-4 rounded-xl border-solid border-x-2 border-y-2 border-black" />
            <p className="mb-4"><strong>Ingredients:</strong> {selectedRecipe.ingredientLines.join(', ')}</p>
            <p className="mb-4"><strong>Instructions:</strong> {selectedRecipe.instructions || 'No instructions available.'}</p>
            <button
              onClick={() => window.open(selectedRecipe.url, '_blank')}
              className="bg-amber-500 hover:bg-amber-600 transition-all text-white font-bold py-2 px-4 rounded-full mr-2 border-solid border-x-2 border-y-2 border-black"
            >
              View Recipe Source
            </button>
            <button
              onClick={closeModal}
              className="bg-amber-500 hover:bg-amber-600 transition-all text-white font-bold py-2 px-4 rounded-full border-solid border-x-2 border-y-2 border-black"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      <div className='grid grid-cols-4 gap-x-10 gap-y-10 mt-12 mb-12'>
        {recipes.map((recipe, index) => (
          <RecipeCard 
            key={index}
            recipe={recipe}
            onClick={() => openRecipeModal(recipe)}
          />
        ))}
      </div>

      <LoadMore 
        onLoadMore={handleLoadMore}
        onSeeLess={handleSeeLess}
        canLoadMore={currentPage < totalPages}
        canSeeLess={currentPage > 1}
      />
    </div>
  );
};

export default HomePage;
