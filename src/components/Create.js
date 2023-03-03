import { useState } from "react";
import CatalogItem from "./CatalogItem";

const Create = ({ addGameHandler }) => {
    const [values, setValues] = useState({
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: ''
    })

    function changeHandler(e) {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))

    }

    function submitHandler(e) {
        e.preventDefault();

        const data = {
            category: values.category,
            imageUrl: values.imageUrl,
            maxLevel: values.maxLevel,
            summary: values.summary,
            title: values.title
        };

        addGameHandler(data)
    };

    return (
        <section id="create-page" className="auth" >
            <form id="create" onSubmit={submitHandler}>
                <div className="container">
                    <h1>Create Game</h1>

                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter game title..."
                        value={values.title}
                        onChange={changeHandler}
                    />

                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter game category..."
                        value={values.category}
                        onChange={changeHandler}
                    />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1} placeholder={1}
                        value={values.maxLevel}
                        onChange={changeHandler}
                    />

                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Upload a photo..."
                        value={values.imageUrl}
                        onChange={changeHandler}
                    />

                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={values.summary}
                        onChange={changeHandler}
                    />

                    <input className="btn submit" type="submit" defaultValue="Create Game" />
                </div>
            </form>
        </section >
    )
}

export default Create;