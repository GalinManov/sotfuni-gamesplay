import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const Details = ({ games, addComment }) => {
    const [comment, setComment] = useState({
        username: '',
        comment: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        comment: ''
    });

    const { gameId } = useParams();

    const game = games.find(x => x._id == gameId);

    function submitHandler(e) {
        e.preventDefault(); 

        if(errors.username.length > 0 || errors.comment.length > 0){
            alert('Please correct all fields before proceeding!')
        } else {
            addComment(gameId, `${comment.username}: ${comment.comment}`)
            setComment({ username: '', comment: '' })
        };      
    };

    function changeHandler(e) {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    };

    function validateUsername(e) {
        let errorMessage = '';
        const usernameValid = e.target.value;

        if (usernameValid.length < 4) {
            errorMessage = 'Username must be at least 4 characters long!'
        } else if (usernameValid.length > 10) {
            errorMessage = 'Username must not be more than 10 characters long!'
        };

        setErrors(state => ({
            ...state,
            username: errorMessage
        }));
    };

    function validateComment(e) {
        let errorMessage = '';
        const commentValid = e.target.value;

        if (commentValid.length === 0) {
            errorMessage = 'Please enter a comment'
        } else if (commentValid.length > 100) {
            errorMessage = 'Comment is too long!'
        };

        setErrors(state => ({
            ...state,
            comment: errorMessage
        }));
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">{game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game.summary}
                </p>
                {/* Bonus ( for Guests and Users ) */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {/* list all comments for current game (If any) */}
                        {game.comments?.map(x =>
                            <li key={x} className="comment"><p>{x}</p></li>)
                        }
                    </ul>
                    {/* Display paragraph: If there are no games in the database */}
                    {!game.comments &&
                        <p className="no-comment">No comments.</p>
                    }

                </div>
                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                <div className="buttons">
                    <Link to={`/edit/${gameId}`} className="button">Edit</Link>
                    <a href="#" className="button">Delete</a>
                </div>
            </div>
            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={submitHandler}>
                    <input
                        type="text"
                        name="username"
                        value={comment.username}
                        onChange={changeHandler}
                        onBlur={validateUsername}
                        placeholder="John Doe"
                    />
                    {errors.username &&
                        <div style={{ color: 'red' }}>{errors.username}</div>
                    }

                    <textarea
                        name="comment"
                        value={comment.comment}
                        onChange={changeHandler}
                        onBlur={validateComment}
                        placeholder="Comment......"
                    />
                    {errors.comment &&
                        <div style={{ color: 'red' }}>{errors.comment}</div>
                    }

                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>
        </section>
    )
}

export default Details;