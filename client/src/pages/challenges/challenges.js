import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { GET_SINGLE_CHALLENGE } from '../../utils/queries';




const Challenges = () => {

    const { questionId } = useParams();

    const [response, setResponse] = useState();

    const [nextQuestion,setQuestion]=useState(false);
    
    const { loading, data } = useQuery(GET_SINGLE_CHALLENGE,
        {
            variables: { challengeId: questionId },
        }
    );

    const challenge = data?.challenge || {};
    console.log(challenge)


    if (loading) {
        return <div> Loading...</div>
    }

    

    const handleSelection = (event) => {
        event.preventDefault();

        console.log(response)

        if (response === challenge.correctAnswer){

    setQuestion(true)
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

                    
                    {nextQuestion ? <div>
                    <h2> YOU GOT IT RIGHT! RIGHT ON!</h2>
                   
                    <Link to="/challenges"> Back to Challenges!</Link>
                </div>:
                    <div>
                    <h2> NICE TRY! Keep trying!</h2>
                    <Link to="/challenges"> Back to Challenges!</Link>
                </div>}
                </h5>
            </main>
        );
    };

    export default Challenges;