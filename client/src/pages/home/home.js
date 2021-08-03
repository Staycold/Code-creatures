import React from 'react';
import imgs from '../../images';
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

// homepage
const Home = () => {
    return (
        <main>
            <div className = 'home-body'>
                <img id="sun" src={imgs.sun} alt="sun sprite" />
                <img id="cloud1" src={imgs.cloud1} alt="cloud sprite 1" />
                <img id="cloud3" src={imgs.cloud3} alt="cloud sprite 2" />
                <div className="card-homepage">
                    <h2>Welcome to Code Creatures!</h2>
                    <h4>Learn to code with your favourite furry friends!</h4>
                    <p>Code Creatures is a virtual pet site that teaches you to code while caring for one of three furry friends.</p>
                    <p>Win coins by completing Code Challenges every day, then use your coins to buy your pet some treats!</p>
                    <p>Join today to start learning!</p>
                </div>

                <div className="petContainer1">
                    <img id="catImg" src={imgs.cat} alt="cat-pet" />
                    <img id="foxImg" src={imgs.fox} alt="fox-pet" />
                    <img id="rabbitImg" src={imgs.rabbit} alt="rabbit-pet" />
                </div>
            </div>
        </main>
    );
};

export default Home;