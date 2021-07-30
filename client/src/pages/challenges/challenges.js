import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client'
import { GET_SINGLE_CHALLENGE } from '../../utils/queries';



const Challenges = () => {

    const { questionId } = useParams();

    const [response, setResponse] = useState();

    const { loading, data } = useQuery(GET_SINGLE_CHALLENGE,
        {
        variables: { challengeId: questionId},
    }
    );

    const challenge = data?.challenge || {};
    console.log(challenge)
    

    if(loading) {
        return <div> Loading...</div>
    }
const handleSelection = (event) => {
    event.preventDefault();
    
    console.log(response)
   
    if (response === challenge.correctAnswer){
        
    }
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
<div onClick={() => setResponse(challenge.choices[0])}>{challenge.choices[0]}  </div>
<div onClick={() => setResponse(challenge.choices[1])}>{challenge.choices[1]} </div>
<div onClick={() => setResponse(challenge.choices[2])}>{challenge.choices[2]}</div>
<div onClick={() => setResponse(challenge.correctAnswer)}>{challenge.correctAnswer} </div>
<button type='submit' onClick={(handleSelection)}>Final Answer</button>
    </h5>
        </main>
    );
};

export default Challenges;