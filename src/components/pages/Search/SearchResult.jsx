import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react"
import { Link } from "react-router-dom";
import { authHeader } from "../../../AppService/AuthHeader";
import { PriceToDK } from "../../App/Helpers/Helpers";
import { Layout } from "../../App/Layout/Layout";
import { SearchContent } from "./SearchData"

export const SearchResult = () => {
    const { searchData } = useContext(SearchContent);
    const [ searchResult, setSearchResult] = useState([]);
    
    useEffect(() => {
        const getData = async () => {
        try {
            if(searchData){
                const response = await axios.get(`https://api.mediehuset.net/homelands/search/${searchData}`)
                    if(response.data) {
                        setSearchResult(response.data.items)
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
        getData();
    }, [searchData])
    
    return(
        <Layout title='Søg'>
            <h2>Søgeresultater</h2>
            <article>
                <h4>Adresse</h4>
                <h4>Kvadratmeter</h4>
                <h4>Værelser</h4>
                <h4>Pris</h4>
            </article>
            {searchResult && searchResult.map(info => {
                return(
                    <Link key={info.id} to={''}>
                        <article>
                            <p>{info.address}</p>
                            <p>{info.floor_space}</p>
                            <p>{info.num_rooms}</p>
                            <p>{PriceToDK(info.price)}</p>
                        </article>
                    </Link>
                )
            })}
    {/* {!searchData.num_items ? () => {
        return(
            <p>Din søgning gav ingen resultater</p>
        )
    } : null } */}
    </Layout>
    )
}