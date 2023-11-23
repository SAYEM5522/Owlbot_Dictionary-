const capitalizeAndPeriod = (example) => {
  const trimmedExample = example?.trim();
const lastCharacter = trimmedExample?.charAt(trimmedExample?.length - 1);
if (lastCharacter === '.') {
  // Example already ends with a period
  return trimmedExample;
}
const words = trimmedExample?.split(' ');
if (words.length === 0) return trimmedExample;
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ') + '.';
};

const useFavoriteHandler = () => {
  const handleFavoriteItem = (item, wordData) => {
    const newFavorite = {
      partOfSpeech: item?.partOfSpeech,
      definition: item.definitions.slice(0, 2).map((item, index) => {
        return {
          definition: item.definition,
          example: item?.example && capitalizeAndPeriod(item?.example),
        };
      }),
      word: wordData[0]?.word,
    };

    // Fetch existing favorites from local storage
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isDuplicate = existingFavorites.some((favorite) => {
      const sameWord = favorite.word === newFavorite.word;
      const samePartOfSpeech = favorite.partOfSpeech === newFavorite.partOfSpeech;

      // Check if there is at least one common definition between the existing favorite and the new one
      const hasCommonDefinition = favorite.definition.some(
        (existingDefinition) =>
          newFavorite.definition.some(
            (newDefinition) => existingDefinition.definition === newDefinition.definition
          )
      );

      return sameWord && samePartOfSpeech && hasCommonDefinition;
    });
    const confirmationMessage = document.createElement('div');
    if(isDuplicate){
      confirmationMessage.innerHTML = 'Already in favorites';
    } else{
      confirmationMessage.innerHTML = 'Added to favorites';
    }

    if (!isDuplicate) {
      // Append the new favorite to the array
      const updatedFavorites = [...existingFavorites, newFavorite];
      // Store the updated array back into local storage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }

       confirmationMessage.style.position = 'fixed';
        confirmationMessage.style.top = '10px';
        confirmationMessage.style.right = '10px';
        confirmationMessage.style.background = 'black';
        confirmationMessage.style.color = 'white';
        confirmationMessage.style.padding = '10px';
        confirmationMessage.style.borderRadius = '5px';
        document.body.appendChild(confirmationMessage);

        // Remove the confirmation message after 1 seconds
        setTimeout(() => {
          document.body.removeChild(confirmationMessage);
        }, 1000);
  };

  return { handleFavoriteItem };
};

export default useFavoriteHandler;
