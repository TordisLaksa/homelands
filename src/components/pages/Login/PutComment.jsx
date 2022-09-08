import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { authHeader } from "../../../AppService/AuthHeader";
import { Layout } from "../../App/Layout/Layout";
import './PutComment.scss';

export const PutComment = () => {
    const { id } = useParams(0);

        const { register, handleSubmit, formState: { errors } } = useForm();
        
        const onSubmit = async (data) => {
            const formData = new URLSearchParams();
            
            formData.append('id', id)
            formData.append('title', data.title);
            formData.append('content', data.content);
            formData.append('num_stars', data.num_stars);
            formData.append('active', 1);
            try {
                const result = await axios.put(`https://api.mediehuset.net/homelands/reviews`, formData, {
                    headers: authHeader()
                });
                if (result) {
                    
                }
            } catch (error) {
                console.log('fuck');
                
            }
        }

    return (
        <Layout title='Edit kommentar' description='Her kan du ændre i din kommentar'>
            <form onSubmit={handleSubmit(onSubmit)} id='putForm'>
                <fieldset>
                    <div>
                        <legend><h2>Her kan du ændre i din kommentar</h2></legend>
                    <div className="PutCommentDiv">
                        <input type="text" id="title" placeholder="Indtast din nye titel" {...register('title', { required: true, maxLength: 200 })} />
                        {errors.title && (
                            <><br /><span>Skriv din nye titel!</span></>
                        )}
                    </div>
                    <div className="PutCommentDiv">
                        <textarea id="content" placeholder="Skriv din nye kommentar her" {...register('content', { required: true })}></textarea>
                        {errors.content && (
                            <><br /><span>Skriv din nye kommentar!</span></>
                        )}
                    </div>
                    <div className="PutCommentDiv">
                        <input type='number' id="num_stars" placeholder="Angiv 1 til 5 &#9733;" {...register('num_stars', { required: true, min: 1, max: 5 })}></input>
                        {errors.num_stars && (
                            <><br /><span>Du skal angive 1-5 stjerner!</span></>
                        )}
                    </div>
                    <div className="PutCommentDivButtons">
                        <button>Gem</button>
                        <button type="reset">Fortryd</button>
                    </div>
                    
                    </div>
                    <div id='positionsDiv'>
                        <p>Efter du har trykket på <i>Gem </i> knappen, skal du trykke på <i>Gå tilbage </i> knappen</p>
                        <p>Hvis du ændrer mening og ikke vil ændre i din kommentar, så skal du også tryppe på <i>Gå tilbage </i> knappen</p>
                        <Link to={'/login'}><button>Gå tilbage</button></Link>
                    </div>
                </fieldset>
            </form>
  
      </Layout>
    )
}