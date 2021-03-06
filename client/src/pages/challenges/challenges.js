import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client'
import { GET_SINGLE_CHALLENGE } from '../../utils/queries';
import { ADD_EXP, ADD_COINS } from '../../utils/mutations';
import './challenge.css'

const Challenges = () => {

    const { questionId } = useParams();

    const [answers, setAnswers] = useState([]);

    // state to track answers
    const [response, setResponse] = useState();

    // state to track if answered correctly
    const [nextQuestion, setQuestion] = useState(false);

    // state to track if answered
    const [answered, setAnswered] = useState(false)

    const [addExp] = useMutation(ADD_EXP)

    const [addCoins] = useMutation(ADD_COINS)

    const { loading, data } = useQuery(GET_SINGLE_CHALLENGE,
        {
            onCompleted: (data) => {
                // function to shuffle choices
                function shuffle(array) {
                    var currentIndex = array.length, randomIndex;

                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {

                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex--;

                        // And swap it with the current element.
                        [array[currentIndex], array[randomIndex]] = [
                            array[randomIndex], array[currentIndex]];
                    }

                    return array;
                }

                let originalChoice = [...data?.challenge.choices, data?.challenge.correctAnswer]
                let randoChoice = shuffle(originalChoice)
                setAnswers(randoChoice)

            },
            variables: { challengeId: questionId },
        }
    );

    const challenge = data?.challenge || {};
    console.log(challenge)



    if (loading) {
        return <div> Loading...</div>
    }

    const handleSelection = async (event) => {
        event.preventDefault();

        console.log(response)

        setAnswered(true)

        if (response === challenge.correctAnswer) {

            setQuestion(true)

            try {
                await addExp({
                    variables: { petExp: 10 }
                })

                await addCoins({
                    variables: { coins: 10 }
                })
            } catch (err) {
                console.error(err)
            }
        }

    }


    return (
        <main className="answersMain" >
            <div className='title'>
                Take your time :)
            </div>
            <div>
                <h2 className='header'>Here is your Challenge :</h2>
                <h4 className='question'> {challenge.question} ?</h4>
            </div>
            {!answered ? (
                <div className='container'>
                    <h5>
                        {answers.map((choice) => {
                            return <div className='choices' onClick={() => setResponse(choice)}>{choice}  </div>
                        })}
                        <button className='faBtn' type='submit' onClick={(handleSelection)}>Final Answer</button>
                    </h5>
                </div>
            ) : (<div>
                {nextQuestion ? <div>
                    <div className='verify'>
                        <h2 className='verify'> YOU GOT IT RIGHT! RIGHT ON!</h2>
                    </div>
                    <div className='verify2'>
                        <Link to="/challenges"> Back to Challenges!</Link>
                    </div>
                </div> :
                    <div>
                        <div className='verify3'>

                            <h2 className='verify3'> NICE TRY! Keep trying!</h2>

                        </div>
                        <div className='verify4'>

                            <Link to="/challenges"> Back to Challenges!</Link>
                        </div>
                    </div>}

            </div>
            )}
        </main>
    );
};

export default Challenges;