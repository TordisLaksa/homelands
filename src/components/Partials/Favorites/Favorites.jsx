import axios from "axios";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { authHeader } from "../../../AppService/AuthHeader";
import { useAuth } from "../../App/Auth/Auth";

export const Favorites = () => {
    const [ openModal, setOpenModal ] = useState('');
    const { handleSubmit, register } = useForm();
    const { loginData } = useAuth();
    
    
    const setFavorite = async (data, e) => {
        const formData = new FormData(e.target);
        
        const options = authHeader();
        const endpoint = 'https://api.mediehuset.net/homelands/favorites';
        const response = await axios.post(endpoint, formData, options);
        console.log(response);
    }
    
    
    return(
        <form onSubmit={handleSubmit(setFavorite)}>
            {/* value i { } */}
            <input type='hidden' name='home_id' value='props.data.id' />
        </form>
    )
}