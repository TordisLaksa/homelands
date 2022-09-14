import axios from 'axios';
import { useEffect, useState } from 'react';
import './Comments.scss';
import { ConvertedDate } from "../../App/Helpers/Helpers";
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

export const Comment = () => {
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await axios.get('https://api.mediehuset.net/homelands/reviews')
                if (response.data) {
                    setCommentList(response.data.items);
                }
            } catch (error) {

            }
        }
        getComments();
    }, [])

    return (
        <>
            <CommentSlide commentList={commentList} />
        </>
    )
}


export const CommentSlide = ({ commentList }) => {
    // Her laver jeg et state for currentSlideIndex og sætter det til 0
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    // Her laver jeg en const variable som jeg sætter til længden af commentList
    const length = commentList.length;

    const nextSlide = () => {
        setCurrentSlideIndex(currentSlideIndex === length - 1 ? 0 : currentSlideIndex + 1)
    }

    const prevSlide = () => {
        setCurrentSlideIndex(currentSlideIndex === 0 ? length - 1 : currentSlideIndex - 1)
    }

    // Her bruger jeg useEffect til at sætte et interval for den automatiske slider
    useEffect(() => {
        const slideInterval = setInterval(() => {
            // Her kalder jeg setCurrentSlideIndex hvert 3 sek
            // Det er en funtion, som sætter currentSlideIndex til det næste index, medmindre at jeg er nået enden,
            // da sættes det til det først index, altså 0
            setCurrentSlideIndex(currentSlideIndex === length - 1 ? 0 : currentSlideIndex + 1);
        }, 3000);

        // Her resetter jeg intervalet, det gør jeg for at det ikke skal overskrive sig selv og dermed stikke af

        return () => clearInterval(slideInterval)
    }, [currentSlideIndex])


    return (
        <>
            <FaArrowCircleLeft onClick={prevSlide} className={'l-a svgImg'} />
            <FaArrowCircleRight onClick={nextSlide} className={'r-a svgImg'} />
            <div className='CommentCarousel'>
                {/* index er tilføjet for at vælge det rigtige class name for slides */}
                {commentList && commentList.map((comment, index) => {
                    return (
                        <article key={index} className={index === currentSlideIndex ? 'SlideActive' : 'Slide'}>
                            {/* ovenfor har jeg lavet et conditional classname hvilket i dette tilfælde vil sige at classname er SlideActive hvis det er lig med det valgte slideindex (currentSlideIndex) */}
                            <h3>{comment.title}</h3>
                            <p>{comment.content}</p>
                            {/* ConvertedDate er i min helper! */}
                            <p>{comment.user.firstname} {comment.user.lastname}, {ConvertedDate(comment.created_friendly)}</p>
                        </article>
                    )
                })}
            </div>
        </>
    )

}