import { createContext, useState } from "react";

const SearchContext = createContext({
  searchInput: "",
});

const SearchContextProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");


  const updateSearchKeyword = (searchKeyword) => {
    setSearchKeyword(searchKeyword);
  };

  const clearInput = () => {
      setSearchKeyword("");
  }

  const context = {
    searchKeyword,
    updateSearchKeyword,
    clearInput,
  };

  return (
    <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };