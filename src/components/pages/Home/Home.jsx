import axios from "axios";
import React, { useEffect, useState } from "react"
import { Layout } from "../../App/Layout/Layout"
import Carousel from 'react-material-ui-carousel';
import './Home.scss';
import { Comment } from "../../Partials/Comments/Comments";

export const Home = () => {
    const [ sliderImg, setSliderImg ] = useState([]);
    
    useEffect(() => {
        const getSliderImg = async () => {
            try {
                const response = await axios.get('https://api.mediehuset.net/homelands/images')
                if(response.data){
                    setSliderImg(response.data.items);
                }
            } catch (error) {
                
            }
        } 
        getSliderImg();
    }, [])
    
    
    return(
        <Layout title='Forside' description='Se vores mange foskellige ejendomme'>
            <HeroCarousel />
            <Card3Images />
            <section id="ReadyForComments">
                <h2>Det siger kunderne</h2>
                <Comment />
            </section>
            <section id="Employee">
                <h2>Mød vores ansatte</h2>
                <article id="EmployeeCardContainer">
                    <Employees />
                </article>
            </section>
        </Layout>
    )
}



export const HeroCarousel = () => {
    const [sliderImg, setSliderImg] = useState([]);

    useEffect(() => {
        const getSliderImg = async () => {
            try {
                const response = await axios.get('https://api.mediehuset.net/homelands/images')
                if (response.data) {
                    setSliderImg(response.data.items);
                }
            } catch (error) {

            }
        }
        getSliderImg();
    }, [])


    return (
        <Carousel className='Carousel'>
            {sliderImg && sliderImg.map(img => {
                return (
                    <div key={img.id} className='ImageWrapper'>
                        <img src={img.image[1]} alt="slider-image" />
                    </div>
                )
            })}
        </Carousel>
    )
}

export const Card3Images = () => {
    const [ getHomeImages, setHomeImages ] = useState();
    
    useEffect(() => {
        const getCardImages = async () =>{
            try {
                const response = await axios.get('https://api.mediehuset.net/homelands/homes')
                if (response.data) {
                    setHomeImages(response.data.items);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getCardImages()
        
    }, [])
    
   
   
    
    return(
        <section id="cardSection">
        {getHomeImages && getHomeImages.slice(0,3).map(item => {
            let val = Number(item.price).toLocaleString('da-DK');
            return(
                <figure key={item.id} className='Cards'>
                    {item.images && item.images.slice(0,1).map(img => {
                        return(
                            <React.Fragment key={img.id}>
                            <img src={img.filename.medium} alt={`billede-af-${img.description}`} />
                            </React.Fragment>
                        )
                    })}
                    <figcaption>
                        <article>
                            <h4>{item.address}</h4>
                            <p>{item.zipcode} {item.city}</p>
                            <p>{item.type}</p>
                        </article>
                        <div>
                            <div className={item.energy_label_name}><p>{item.energy_label_name}</p></div>
                            <p>{item.num_rooms} værelser, {item.floor_space} m2</p>
                            <p>{val} kr.</p>
                        </div>
                    </figcaption>
                </figure>
            )
        })}
        </section>
    )
}

export const Employees = () => {
    const [ getEmployees, setEmployeesData ] = useState();
    useEffect(() => {
       const getData = () => {
           fetch('https://api.mediehuset.net/homelands/staff')
           .then((response) => response.json())
           .then((response) => setEmployeesData(response.items))
           .catch((error) => console.log("Error: ", error));
           
       }
       getData();
    }, [])
    
    return(
        <>
        
        {getEmployees && getEmployees.map(employee => {
        return(
            <figure key={employee.id} className='EmployeeCard'>
                <img src={employee.image} alt={`billede-af-${employee.firstname} ${employee.lastname}`} />
                <figcaption>
                    <hr className="hr" />
                    <h3>{employee.firstname} {employee.lastname}</h3>
                    <h4>{employee.position}</h4>
                </figcaption>
            </figure>  
            )    
        })}
        </>  
    )
}