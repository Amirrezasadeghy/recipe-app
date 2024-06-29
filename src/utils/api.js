

export const fetchRecipes = async (query, page = 1) => {
    const appId = 'dad0571b';
    const appKey = 'c45fc2ac35d1db4368c1c8113e259458';
    const from = (page - 1) * 8;
    const to = page * 8;

    const response = await fetch (
        `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from${from}&to=${to}`
    );

    const data = await response.json();
    return data;
};

