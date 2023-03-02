import { useState } from "react";
import { useParams } from "react-router-dom";

const Details = ({ games, addComment }) => {
    const [comment, setComment] = useState({
        username: '',
        comment: ''
    })

    const { gameId } = useParams();

    const game = games.find(x => x._id == gameId);

    function submitHandler(e) {
        e.preventDefault();

        addComment(gameId, `${comment.username}: ${comment.comment}`)

        setComment({username: '', comment: ''});

    }

    function chageHandler(e) {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
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
                    <a href="#" className="button">Edit</a>
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
                        onChange={chageHandler}
                        placeholder="John Doe"
                    />
                    <textarea
                        name="comment"
                        value={comment.comment}
                        onChange={chageHandler}
                        placeholder="Comment......"
                    />
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>
        </section>
    )
}

export default Details;