import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";
import * as gameServices from "./services/gameService";
import Navigation from './components/common/Navigation';
import Home from './components/HomeComp/Home';
import Login from './components/Login';
import Register from './components/Register';
import Create from './components/Create';
import Catalog from './components/Catalog';
import Details from './components/Details';

function App() {
  const [games, setGames] = useState([]);

  const addComment = (gameId, comment) => {
    setGames(state => {
      const game = state.find(x => x._id == gameId);

      const comments = game.comments || [];
      comments.push(comment)

      return [
        ...state.filter(x => x._id !== gameId),
        {...game, comments}
      ]
  })
  }

  useEffect(() => {
    gameServices.getAll()
      .then(result => {
        setGames(result)
      })
  }, [])

  return (
    <div className="App">
      <Navigation />

      {/* Main Content */}
      <main id="main-content">
        <Routes>
          <Route path='/' element={<Home games={games} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<Create />} />
          <Route path='/catalog' element={<Catalog games={games} />} />
          <Route path='/catalog/:gameId' element={<Details games={games} addComment={addComment}/>} />
        </Routes>

      </main>



      {/* Edit Page ( Only for the creator )*/}
      <section id="edit-page" className="auth">
        <form id="edit">
          <div className="container">
            <h1>Edit Game</h1>
            <label htmlFor="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" defaultValue />
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" name="category" defaultValue />
            <label htmlFor="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min={1} defaultValue />
            <label htmlFor="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" defaultValue />
            <label htmlFor="summary">Summary:</label>
            <textarea name="summary" id="summary" defaultValue={""} />
            <input className="btn submit" type="submit" defaultValue="Edit Game" />
          </div>
        </form>
      </section>

    </div>
  );
}

export default App;
