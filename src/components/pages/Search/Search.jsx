import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Layout } from "../../App/Layout/Layout";
import { AiOutlineSearch } from "react-icons/ai";


export const Search = () => {
    const [keyword, setKeyword] = useState('');
    const { register, handleSubmit } = useForm();

    
    const getSearchResult = data => {
        setKeyword(data.keyword);
    }
    return (
        <Layout title='' description='Søg blandt vores instrumenter her'>
            {/* Closure */}
            <form onSubmit={handleSubmit(getSearchResult)}>
                <input type="text" id="keyword" placeholder="Indtast søgeord"{...register('keyword', { required: true })} />
                <button><AiOutlineSearch /></button>
            </form>
            {keyword && (
                <SearchResult keyword={keyword} />

            )}
        </Layout>
    )
}


export const SearchResult = props => {
    const [searchData, setSearchData ] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const result = await axios.get(`https://api.mediehuset.net/homelands/search/${props.keyword}`)
            setSearchData(result.data);
        }
        
        getData();
    }, [props.keyword, setSearchData])
    
    
    return (
    <>
        {searchData.num_items ? 
        <FoundResults num_items={searchData.num_items} items={searchData.items} keyword={props.keyword} /> 
        : 
        <NoResults keyword={props.keyword} />}
    </>  
    )
    
}


const FoundResults = (props) => {
   return(
    <>
       <p>Fandt {props.num_items} resultater på søgningen <i>'{props.keyword}'</i></p>
       <article id="searchResults">
       {props.items && props.items.map((item, i) => {
        console.log(item);
           return(
               <p key={i}>{item.address}, {item.zipcode} {item.city}</p>
            )
        })}
        </article>
    </>
    )
}
        
const NoResults = (props) => {
    return(
        <>
            <p>Fandt desværre 0 resultater på søgningen <i>'{props.keyword}'</i></p>
            <p> - Kontrollér stavningen, eller prøv igen med en mindre specifik søgeterm</p>
        </>
    )
}