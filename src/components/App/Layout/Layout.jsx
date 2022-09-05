import { useEffect } from "react";


//Det her er til hver eneste side for at skabe en gennemgående dynamisk model til hver side ift seo og indhold
const Layout = props => {
    useEffect(() => {
        document.title = props.title
        if(props.description){
            document.querySelector('meta[name="description"]')
            .setAttribute('content', props.description)
        }
    },[props.title, props.description])
    
    return(
        <>
            <h1>{props.title}</h1>
            {props.children}
        </>
    )
}



 export { Layout }