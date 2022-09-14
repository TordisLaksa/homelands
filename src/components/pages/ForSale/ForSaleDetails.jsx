import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { PriceToDK } from "../../App/Helpers/Helpers";
import { Layout } from "../../App/Layout/Layout"
import './ForSaleDetails.scss'
import { ModalContent } from "./ModalContent"
import { useModalStore } from "./useModalStore"


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
    
    const { ToggleModal, modalData, setModalData, setToggleModal } = useModalStore((store) => ({
        ToggleModal: store.ToggleModal,
        modalData: store.modalData,
        setModalData: store.setModalData,
        setToggleModal: store.setToggleModal,
    }));
    
    const doLike = () => {
        console.log("LIKE!!");
    }

    const showModal = (display, id) => {
        if (id === 3) {
            doLike()
        }
        else {
            setToggleModal(display)
            setModalData(id)
        }
    }
    
    const arrIcons = [
        { name: 'CameraIcon.svg', key: 1, alt: 'camera-icon', id: 'Camera' },
        { name: 'LayoutIcon.svg', key: 2, alt: 'layout-icon', id: 'Layout' },
        { name: 'LocationIcon.svg', key: 3, alt: 'location-icon', id: 'Location' },
        { name: 'HeartIcon.svg', key: 4, alt: 'heart-icon', id: 'Heart' }
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


    
    
    return(
        <Layout title='Detaljer'>
            
        {homeData ? (
            <>
            <div style={{ "display": ToggleModal }} className="modal">
                <section onClick={() => setToggleModal("none")}>
                    <span >
                        <ModalContent idToShow={modalData} />
                    </span>
                </section>
            </div>
            <section id="ForSaleSection">'
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
                                        <div className="circle" onClick={() => showModal("flex", i)}>
                                            <img src={require (`../../../Assets/Images/${item.name}`)} alt={item.alt} />
                                        </div>
                                    </React.Fragment>
                                    )
                                })}
                        </article>
                        <article>
                            <h5>Kontantpris: <span className="biggertxt">{PriceToDK(homeData.price)} kr. </span> </h5>
                            <h5>Udbetaling: {PriceToDK(homeData.payout)} kr.</h5>
                            <h5>Ejerudgift per måned: {PriceToDK(homeData.cost)} kr.</h5>
                        </article>
                    </figcaption>
                    <figcaption id='DetailSpecificInfo'>
                        <article>
                            {/* 2 p tags grid repeat (2, 1fr) gap 1% */}
                            <p>Sagsnr. {homeData.id}</p>
                            <p>Boligarea: {homeData.floor_space}m2</p>
                            <p>Grundareal: {homeData.ground_space}m2</p>
                            <p>Antal rum: {homeData.num_rooms}</p>
                            <p>Antal plan: {homeData.num_floors}</p>
                        </article>
                        <article>
                            <p>Kælder: {homeData.basement_space}</p>
                            <p>Byggeår: {homeData.year_construction}</p>
                            <p>Ombygget: {homeData.year_rebuilt }</p>
                            <p>Energimærke: {homeData.num_rooms}</p>
                            <p>Liggetid: {days(todaySDate)} dage</p>
                        </article>
                        <article>
                            <p>Kontantpris: {PriceToDK(homeData.price)} kr.</p>
                            <p>Udbetaling: {PriceToDK(homeData.payout)} kr.</p>
                            <p>Brutto ex. ejerudgift: {PriceToDK(homeData.gross)} kr.</p>
                            <p>Netto ex. ejerudgift: {PriceToDK(homeData.net)} kr.</p>
                            <p>Ejerudgift: {PriceToDK(homeData.cost)} kr.</p>
                        </article>
                    </figcaption>
                    <figcaption id='DetailContact'>
                            <article><p className="nl2br">{homeData.description}</p></article> 
                            <article>
                                <div>  
                                <h4>Kontakt</h4>
                                <img src={homeData.staff.image} alt={`billede-af-${homeData.staff.firstname}`} />
                                <h6>{homeData.staff.firstname} {homeData.staff.lastname}</h6>
                                <p>{homeData.staff.position}</p>
                                <p>Mobil: {homeData.staff.phone}</p>
                                <p>Email: {homeData.staff.email}</p>
                                </div>
                            </article>
                    </figcaption>
                </figure>
            </section>
            </>
        ) : <>... loading</>}
        </Layout>
    )
}