import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "../../App/Layout/Layout"
import axios from 'axios';
import './ForSaleList.scss'
import { PriceToDK } from "../../App/Helpers/Helpers";

export const ForSaleList = () => {
    
    const { home_id } = useParams(0);
    const [ homeList, setHomeList ] = useState([]);
    
    //som en side effekt af at indlæser siden så skal den hente listen
    useEffect(() => {
        const getHomeList = async () => {
            try {
                const response = await axios.get('https://api.mediehuset.net/homelands/homes')
                if (response.data) {
                    setHomeList(response.data.items)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getHomeList();

    }, [setHomeList])
    
    return(
        <Layout title='Boliger til salg'>
            <article id="ForSaleArticle">
            {homeList && homeList.map(home => {
               return(
                   <figure key={home.id} className='card'>
                        <Link to={`${home.id}`}>
                            <img src={home.images[0].filename.medium} alt={home.type} />
                        </Link>
                        <figcaption>
                            <article className="AddressInfo">
                            <h4>{home.address}</h4>
                            <h5>{home.zipcode} {home.city}</h5>
                            <h5>{home.type}</h5>
                            </article>
                            <article className="EconomyInfo">
                                <div className="EconomyWrapper">
                                    <div className={home.energy_label_name}><p>{home.energy_label_name} </p></div>
                                    <p>{home.num_rooms} værelser, {home.floor_space}m2</p>
                                </div>
                                <p>{PriceToDK(home.price)} kr.</p>
                            </article>
                        </figcaption>
                    </figure>
                )
            })}
            </article>
        </Layout>
    )
}