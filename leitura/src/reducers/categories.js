export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

const categories = (state = {}, action) => {
  const { categories } = action;
  console.log('ACTION', categories)
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return categories;
    default:
      return state;
  }
};

export default categories;
