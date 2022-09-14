import "./ModalContent.scss"


export const ModalContent = (props) => {
    //HER LAVER JEG MIN FETCH
    if (props.idToShow === 0) {
        //HVIS JEG SKAL FETCHE FRA ET ANDET SPECIFIKT ENDPOINT SÅ EFTER IF
        //BILLEDER
        return (
            <>
                <h2>id er: {props.idToShow}</h2>
                <p>Et billede her, måske en slider</p>
            </>
        )
    }
    else if (props.idToShow === 1) {
        return (
            //POTENTIEL PLANTEGNING
            <>
                <h2>id er: {props.idToShow}</h2>
                <p>En plantegning her</p>
            </>
        )
    }
    else if (props.idToShow === 2) {
        return (
            //MAPS
            <>
                <h2>id er: {props.idToShow}</h2>
                <p>Sådan noget maps her</p>
            </>
        )
    }
    else {
        return (
            //FEJL!
            <>
                <h2>id er: {props.idToShow}</h2>
                <p>Der er ingen content til dette id</p>
            </>
        )
    }

}