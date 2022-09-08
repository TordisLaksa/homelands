import axios from 'axios';
import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import './Comments.scss';

export const Comment = () => {
    const [ commentList, setCommentList ] = useState([]);
    
    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await axios.get('https://api.mediehuset.net/homelands/reviews')
                if(response.data){
                    setCommentList(response.data.items);
                }
            } catch (error) {
                
            }
        }
        getComments();
    }, [])
  
    
    return(
        <Carousel className='CommentCarousel'>
            {commentList && commentList.map(comment => {
                let myDate = new Date(comment.created_friendly);
                let final_date = myDate.getDate() + " - " + (myDate.getMonth() + 1) + " - " + (myDate.getFullYear());
                return(
                    <article key={comment.id} className='CommentArticle'>
                        <h3>{comment.title}</h3>
                        <p>{comment.content}</p>
                        <p>{comment.user.firstname} {comment.user.lastname}, {final_date}</p>
                    </article>
                )
            })}
            
        </Carousel>
    )
}