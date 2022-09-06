import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { Layout } from "../../App/Layout/Layout"
import './ForSaleDetails.scss'



export const ForSaleDetails = () => {
    const { home_id } = useParams(0);
    const [ homeData, setHomeData ] = useState({});
    
    useEffect(() => {
        const getHomeData = async () => {
            try{
                const response = await axios.get(`https://api.mediehuset.net/homelands/homes/${home_id}`)
                if(response.data){
                    setHomeData(response.data.item);
                }
            } catch(error) {
                console.log(error);
            }
        }
        getHomeData();
    }, [home_id])
    
    const arrIcons = [
        { name: 'CameraIcon.svg', alt: 'camera-icon' },
        { name: 'LayoutIcon.svg', alt: 'layout-icon' },
        { name: 'LocationIcon.svg', alt: 'location-icon' },
        { name: 'HeartIcon.svg', alt: 'heart-icon' }
    ]
    
    return(
        <Layout title='Detaljer'>
            <figure>
                <img src={homeData.images[0].filename.large} alt={`${homeData.images[0].author}-${homeData.images[0].description}`} />
                <div>
                    <article>
                        <h2>{homeData.address}</h2>
                        <h5>{homeData.zipcode} {homeData.city}</h5>
                        <h5>{homeData.type} | {homeData.floor_space}m2 | {homeData.num_rooms} værelser</h5>
                        <h5>Set {homeData.num_clicks} gange</h5>
                    </article>
                    <article>
                        {arrIcons.map(item => {
                            return(
                                <img src={require (`../../../Assets/Images/${item.name}`)} alt={item.alt} />
                            )
                        })}
                    </article>
                </div>
            </figure>
        </Layout>
    )
}