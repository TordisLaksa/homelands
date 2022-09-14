import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { SearchContent } from "./SearchData";


export const SearchBar = () => {
    const navigate = useNavigate();
    const { setSearchData } = useContext(SearchContent);
    const { register, handleSubmit } = useForm();
    
    const getResults = (data) => {
        setSearchData(data.SearchItem);
        navigate('/search', { replace: true });
    };
    
    return(
        <form onSubmit={handleSubmit(getResults)}>
            <input id='searchItem' type="text" 
            {...register('SearchItem', {required: true})}
            placeholder='Indtast søgeord' />
            <button>&#x1F50E;</button>            
        </form>
    )
}