import { useForm } from "react-hook-form"

export const Form = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    
    return(
    <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
            <div>
                <label htmlFor="name">Fornavn </label>
                    <input type="text" id="name" placeholder="Fornavn" {...register('firstname', { required: true, maxLength: 30 })} />
                    {errors.firstname && (
                        <span>Udfyld venligst dit fornavn!</span>
                    )}
            </div>
            <div>
                <label htmlFor="last">Efternavn </label>
                    <input type="text" id="last" placeholder="Efternavn" {...register('lastname', { required: true, maxLength: 30 })} />
                    {errors.lastname && (
                        <span>Udfyld venligst dit efternavn!</span>
                    )}
            </div>
            <div>
                <label htmlFor="address">Adresse </label>
                <input type="text" id="address" placeholder="Adresse" {...register('address', { required: true })} />
                    {errors.address && (
                        <span>Udfyld venligst din adresse!</span>
                    )}
            </div>
            <div>
                <label htmlFor="email">Email </label>
                    <input type="email" id="email" placeholder="Email" {...register('email', { required: true })} />
                    {errors.email && (
                        <span>Udfyld venligst din email!</span>
                    )}
            </div>
            <div>
                <label htmlFor="phonenumber">Telefonnummer </label>
                <input type="number" id="phonenumber" placeholder="Telefonnummer" {...register('phonenumber', { required: true, maxLength: 8 })} />
                    {errors.phonenumber && (
                        <span>Udfyld venligst dit telefonnummer!</span>
                    )}
            </div>
            <div>
                <button>Send</button>
                <button type="reset">Nulstil alle felter</button>
            </div>
        </fieldset>
    </form>
    )
}