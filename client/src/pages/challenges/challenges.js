import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client'
import { GET_CHALLENGE } from '../../utils/queries';


const Challenges = () => {

    const { challengeId } = useParams();


    const { loading, data } = useQuery(GET_CHALLENGE
        // {
        // variables: { challengeId: challengeId},
    // }
    );

    const challenge = data?.challenges[0]|| {};
    console.log(challenge)
    

    if(loading) {
        return <div> Loading...</div>
    }
const handleSelection = (event) => {
    event.preventDefault();
    // if (answer === correctAnswer && dailyAttempt <3 ){
    
    // }
}

    return (
        <main>
            <div>
                Challenges
            </div>
<div>
    <h2>Question</h2>
   <h4> {challenge.question}</h4>
</div>
    <h5>
<div onClick={(event) => handleSelection(event)}>{challenge.choices[0]}  </div>
<div onClick={(event) => handleSelection(event)}>{challenge.choices[1]} </div>
<div onClick={(event) => handleSelection(event)}>{challenge.choices[2]}</div>
<div onClick={(event) => handleSelection(event)}>{challenge.correctAnswer} </div>
    </h5>
        </main>
    );
};

export default Challenges;