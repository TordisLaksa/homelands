import { createContext, useState } from 'react';

export const SearchContent = createContext();

export const SearchContainer = ({children}) => {
    const [ searchData, setSearchData ] = useState('');
    
    return(
        <SearchContent.Provider value={{searchData, setSearchData}}>
            {children}
        </SearchContent.Provider>
    )
}