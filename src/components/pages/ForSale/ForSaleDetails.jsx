import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { Layout } from "../../App/Layout/Layout"
import './ForSaleDetails.scss'



export const ForSaleDetails = () => {
    const { home_id } = useParams(0);
    const [ homeData, setHomeData ] = useState();
    
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
        { name: 'CameraIcon.svg', key: 1, alt: 'camera-icon' },
        { name: 'LayoutIcon.svg', key: 2, alt: 'layout-icon' },
        { name: 'LocationIcon.svg', key: 3, alt: 'location-icon' },
        { name: 'HeartIcon.svg', key: 4, alt: 'heart-icon' }
    ]
    
    
    let todaySDate = new Date();
    //Gør det samme som ovenover men datoen er givet med som argument
    // let otherDate = new Date(homeData.date_friendly);
    const days = (date_1) => {
        //getTime giver tiden i milisekunder for "difference" bliver forskellen imellem de 2 tider i milisekunder
        let difference = date_1.getTime() - (homeData && homeData.date_stamp * 1000);
        //Math.floor runder ned så vi får differencen i dage. (1000 * 60 * 60 * 24) er en dag i milisekunder
        let TotalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        return TotalDays;
    }
    console.log(days(todaySDate));
    return(
        <Layout title='Detaljer'>
            
        {homeData ? (
            <>
            <section>
                {console.log(homeData)}
                <figure>
                    <img id='TopImg' src={homeData.images[0].filename.large} alt={homeData.images[0].description} />
                    <figcaption id="DetailHomeInfo">
                        <article>
                            <h2>{homeData.address}</h2>
                            <h5>{homeData.zipcode} {homeData.city}</h5>
                            <h5>{homeData.type} | {homeData.floor_space}m2 | {homeData.num_rooms} værelser</h5>
                            <h5>Set {homeData.num_clicks} gange</h5>
                        </article>
                        <article>
                            {arrIcons.map((item, i)  => {
                                return(
                                    <React.Fragment key={i}>
                                        <div className="circle">
                                            <img src={require (`../../../Assets/Images/${item.name}`)} alt={item.alt} />
                                        </div>
                                    </React.Fragment>
                                    )
                                })}
                        </article>
                        <article>
                            <h5>Kontantpris <span className="biggertxt"> {homeData.price} </span> </h5>
                            <h5>Udbetaling {homeData.payout}</h5>
                            <h5>Ejerudgift per måned {homeData.cost}</h5>
                        </article>
                    </figcaption>
                    <figcaption>
                        <article>
                            <p>Sagsnr. {homeData.id}</p>
                            <p>Boligareal {homeData.floor_space}</p>
                            <p>Grundareal {homeData.ground_space}</p>
                            <p>Antal rum {homeData.num_rooms}</p>
                            <p>Antal plan {homeData.num_floors}</p>
                        </article>
                        <article>
                            <p>Kælder {homeData.basement_space}</p>
                            <p>Byggeår {homeData.year_construction}</p>
                            <p>Ombygget {homeData.year_rebuilt }</p>
                            <p>Energimærle {homeData.num_rooms}</p>
                            <p>Liggetid: {days(todaySDate)} dage</p>
                        </article>
                        <article>
                            <p>Kontantpris {homeData.price}</p>
                            <p>Udbetaling {homeData.payout}</p>
                            <p>Brutto ex. ejerudgift {homeData.gross}</p>
                            <p>Netto ex. ejerudgift {homeData.net}</p>
                            <p>Ejerudgift {homeData.cost}</p>
                        </article>
                    </figcaption>
                    <figcaption>
                            <article><p className="nl2br">{homeData.description}</p></article> 
                            <article>
                                <h4>Kontakt</h4>
                                <img src={homeData.staff.image} alt={`billede-af-${homeData.staff.firstname}`} />
                                <h6>{homeData.staff.firstname} {homeData.staff.lastname}</h6>
                                <p>{homeData.staff.position}</p>
                                <p>Mobil: {homeData.staff.phone}</p>
                                <p>Email: {homeData.staff.email}</p>
                            </article>
                    </figcaption>
                </figure>
            </section>
            </>
        ) : <>... loading</>}
        </Layout>
    )
}