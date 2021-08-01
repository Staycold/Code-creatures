import React, { useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client'
import { GET_SINGLE_CHALLENGE } from '../../utils/queries';
import { ADD_EXP } from '../../utils/mutations';

import './challenge.css'




const Challenges = () => {

    const { questionId } = useParams();

    const [answers, setAnswers]= useState([]);

    const [response, setResponse] = useState();

    const [nextQuestion,setQuestion]=useState(false);

    const [answered, setAnswered] = useState(false)

    const [addExp, {error}]= useMutation(ADD_EXP)
    
    const { loading, data } = useQuery(GET_SINGLE_CHALLENGE,
        {
            onCompleted:( data ) => {
                function shuffle(array) {
                    var currentIndex = array.length,  randomIndex;
                  
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

        if (response === challenge.correctAnswer){
    
    
    setQuestion(true)

    try {
        const { data } = await addExp({
            variables: { petExp:10 }
        })
        console.log(data)
    } catch (err) {
        console.error(err)
    }
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
                {!answered ?(
                <h5>
                    {answers.map((choice) => {
                     return  <div className='choices' onClick={() => setResponse(choice)}>{choice}  </div>  
                    })}
                                    
                    <button type='submit' onClick={(handleSelection)}>Final Answer</button>
                    </h5>
                        ):(<div>

                    {nextQuestion ? <div>
                    <h2> YOU GOT IT RIGHT! RIGHT ON!</h2>
                   
                    <Link to="/challenges"> Back to Challenges!</Link>
                </div>:
                    <div>
                    <h2> NICE TRY! Keep trying!</h2>
                    <Link to="/challenges"> Back to Challenges!</Link>
                </div>}
                
                         </div>
                )}
            </main>
        );
    };

    export default Challenges;