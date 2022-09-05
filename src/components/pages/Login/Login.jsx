import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../App/Auth/Auth";

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
            // handleSubmit(sendLoginRequest)...
            //Closure betyder at vi kan tilgå en functions ydre scope fra en indre function
            <form onSubmit={handleSubmit(sendLoginRequest)}>
                <div>
                    <label htmlFor="username"> Brugernavn: </label>
                    <input type="text" id="username" placeholder="Indtast dit brugernavn" 
                    //registrer feltet username (kan også være hest)
                        {...register("username", { required: true })} />
                        {errors.username && (
                            <span>Udfyld venligst dit brugernavn!</span>
                        )}
                </div>
                <div>
                    <label htmlFor="password">Adgangskode: </label>
                    <input type="password" id="password" placeholder="Indtast din adgangskode"
                        {...register("password", { required: true })} />
                        {errors.password && (
                            <span>Udfyld venligst din adgangskode!</span>
                        )}
                </div>
                <div>
                    <button>Login</button>
                    <button type="reset">Nulstil felter</button>
                </div>
            </form>
        ) :
            <div>
                <p>Du er logget ind som <i>{loginData.username}</i></p>
                <button onClick={logOut}>Log ud</button>
            </div>
        }
        </>
    )            
}