import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../App/Auth/Auth";
import './Login.scss';
import { Layout } from "../../App/Layout/Layout";
import { authHeader } from "../../../AppService/AuthHeader";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export const Login = () => {
    //useForm
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    //min getter og setter
    const { loginData, setLoginData } = useAuth();

    //sender min Login Request
    const sendLoginRequest = async (data, e) => {
        e.target.reset();
        
        // laver et nyt Form Data object
        const formData = new FormData();
        //tilføjer username og password fra data til objectet
        formData.append("username", data.username);
        formData.append("password", data.password);
        const endpoint = "https://api.mediehuset.net/token";
        //poster til url endpoint med formData
        const result = await axios.post(endpoint, formData);
        //sætter result i min handleSessionData
        handleSessionData(result);
    };

    const handleSessionData = (res) => {
        //hvis ikke der kommer en fejlbesked - altså hvis login success
        if (!res.message) {
            //setter jeg logindata til res.data
            setLoginData(res.data);
            //sætter min token i sessionstorage og laver objectet om til en string
            sessionStorage.setItem('token', JSON.stringify(res.data));
        }
    }

    const logOut = () => {
        //fjerner token og sætter den til en tom string = logged out!
        sessionStorage.removeItem('token')
        setLoginData('')
    }

    
    
    return (
        <>
        {/* hvis ikke brugeren er logget ind vises en valideret form
        med error handling på til at vejlede brugeren
        ellers vises at brugeren er logget ind som loginData.username og muligheden
        for at logge ud (dette bliver lavet ved hjælp af en
        CONDITIONAL TERNERY OPERATOR !!!! giv mig en god karakter!*/}
        {!loginData ? (
            <Layout title='Login' description='Her kan du logge ind på din egen profil'>
                <section id="LogIn">
                <h1>Login</h1>
                <p>Indtast dit brugernavn og adgangskode for at logge ind</p>
            {/* handleSubmit(sendLoginRequest)...
            Closure betyder at vi kan tilgå en functions ydre scope fra en indre function */}
            <form onSubmit={handleSubmit(sendLoginRequest)}>
                <div>
                    <input type="text" id="username" placeholder="Indtast dit brugernavn" 
                    //registrer feltet username (kan også være hest)
                        {...register("username", { required: true })} />
                        {errors.username && (
                            <span className="error">Udfyld venligst dit brugernavn!</span>
                        )}
                </div>
                <div>
                    <input type="password" id="password" placeholder="Indtast din adgangskode"
                        {...register("password", { required: true })} />
                        {errors.password && (
                            <span className="error">Udfyld venligst din adgangskode!</span>
                        )}
                </div>
                <div className="buttons">
                    <button>Login</button>
                    <button type="reset">Annuller</button>
                </div>
            </form>
            </section>
            </Layout>
        ) :
            <Layout title='Administration'>
                <section id="LoggedIn">
                    <div className="articleWrapper">
                        <CommentPanel />
                    </div>              
                    <article id="LogOutCommentArea">
                        <div id="LogOut">
                            <p>Du er logget ind som <i>{loginData.username}</i></p>
                            <button onClick={logOut}>Log ud</button>
                        </div>
                        <CommentPost />
                    </article>
                </section>
            </Layout>
        }
        </>
    )            
}


export const CommentPost = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('num_stars', data.num_stars);
        formData.append('active', 1);

        try {
            const result = await axios.post(`https://api.mediehuset.net/homelands/reviews`, formData, {
                headers: authHeader()
            });
            if (result) {
                console.log('Ok post')
                console.log(data);
            }
        } catch (error) {
            console.log('fuck');

        }

    }

    return (
        <>
            <article className="LoggedIn">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <legend><h3>Skriv en kommentar her</h3></legend>
                        <div className="CommentDiv">
                            <input type="text" id="title" placeholder="Indtast en titel" {...register('title', { required: true, maxLength: 200 })} />
                            {errors.title && (
                                <><br /><span>Du skal skrive en titel!</span></>
                            )}
                        </div>
                        <div className="CommentDiv">
                            <textarea id="content" placeholder="Skriv din kommentar her" {...register('content', { required: true })}></textarea>
                            {errors.content && (
                                <><br /><span>Du skal skrive en kommentar!</span></>
                            )}
                        </div>
                        <div className="CommentDiv">
                            <input type='number' id="num_stars" placeholder="Angiv 1 til 5 &#9733;" {...register('num_stars', { required: true, min: 1, max: 5})}></input>
                            {errors.num_stars && (
                                <><br /><span>Du skal angive 1-5 stjerner!</span></>  
                            )}
                        </div>
                        <div className="CommentDivButtons">
                            <button>Send</button>
                            <button type="reset">Annuller</button>
                        </div>
                    </fieldset>
                </form>
            </article>

        </>
    )
}


export const CommentPanel = () => {
    const { loginData, setLoginData } = useAuth();
    const [ userData, setUserData ] = useState();
    const { id } = useParams(0);
        
    useEffect(() => {
        const getCommentDetailList = async () => {
            try {
                const response = await axios.get('https://api.mediehuset.net/homelands/reviews')
                if (response) {
                    setUserData(response.data.items);
                }
            } catch (error) {
                
            }
        }
        getCommentDetailList()
    }, [userData]);
    return(
        <article className="commentPanel">
            <h2>Anmeldelser</h2>
            <table>
                <tbody>
                <tr>
                    <th>Titel</th>
                    <th>Oprettet</th>
                    <th>Handling</th>
                </tr>
                <tr><td><hr /></td></tr>
            {userData && userData.map((user, i) => {
                let myDate = new Date(user.created_friendly);
                let final_date = myDate.getDate() + " - " + (myDate.getMonth() + 1) + " - " + (myDate.getYear() - 100);
                if (user.user_id == loginData.user_id) {
                 
                    return(
                        <React.Fragment key={i}>
                        <tr>
                            <td>{user.title}</td>
                            <td>{final_date}</td>
                            <td>
                                <Link to={`/putcomment/${user.id}`}><button>Edit</button></Link>
                                <CommentDelete id={user.id} />
                            </td>
                        </tr>
                        <tr>
                            <td><hr /></td>
                        </tr>
                        
                        </React.Fragment>
                    )
                } else{
                    return(
                        null
                    )
                }
                
            })}
                </tbody>
            </table>
        </article>
    )
}

const CommentDelete = ( props ) =>{
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { id } = useParams(0);

    const onSubmit = async () => {
        console.log('we are in!');
            try {
                const response = await axios.delete(`https://api.mediehuset.net/homelands/reviews/${props.id}`, {
                    headers: authHeader()
                });
                if (response) {
                   console.log('deleted');
                }
            } catch (error) {
                console.log('error!!');
            }
    };
    
    
    return(
        <>
        <button onClick={onSubmit}>Slet kommentar</button>
        <p></p>
        </>
    )
}