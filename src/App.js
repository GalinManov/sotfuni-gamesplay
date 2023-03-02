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
import EditGame from './components/EditGame';

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
          <Route path='/create' element={<Create setGames={setGames} />} />
          <Route path='/catalog' element={<Catalog games={games} />} />
          <Route path='/catalog/:gameId' element={<Details games={games} addComment={addComment}/>} />
          <Route path='/edit/:gameId' element={<EditGame />} />
        </Routes>

      </main>
    </div>
  );
}

export default App;
