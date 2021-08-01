import React from 'react';
import imgs from '../../images';
import './home.css'

const Home = () => {

    return (
        <main>
            <div>
            <div className="card card-homepage">
  <div className="card-body">
    <h5 className="card-title">Welcome to Code Creatures!</h5>
    <h6 className="card-subtitle mb-2 text-muted">Learn to code with your favourite furry friends!</h6>
    <p className="card-text">Code Creatures is a virtual pet site that teaches you to code while caring for one of three furry friends.</p>
    <p className="card-text">Win coins by completing Code Challenges every day, then use your coins to buy your pet some treats!</p>
    <p className="card-text">Join today to start learning!</p>
  </div>
</div>
        <img className="catImg" src={imgs.cat} alt="cat-pet" />
        <img className="foxImg" src={imgs.fox} alt="fox-pet" />
        <img className="rabbitImg" src={imgs.rabbit} alt="rabbit-pet" />
            </div>
        </main>
    );
};

export default Home;