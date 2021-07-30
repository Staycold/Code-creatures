import React from 'react';
import { GET_CHALLENGE } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';


const ChallengeHub = () => {

   
    

    const { loading, data } = useQuery(GET_CHALLENGE)

    const challenge = data?.challenges || {};
    console.log(challenge)
    console.log(data)
        if(loading) {
            return <div> Loading...</div>
        }


        // const handleSelection = (event) => {
        //     event.preventDefault();
            
        // }
        
            return (
                <>
                <main>
                    <div>
                        Challenges
                    </div>
        <div>
            <h2>Daily Challenges</h2>
          
        </div>
        <div>
          {challenge?.map((question) => {
            return (
              <div key={question._id} border='dark'>
                
                <div>
                                   
                </div>
                <Link to={`/challenges/${question._id}`}>
                <h2>{question.question}</h2> 
                        </Link>
              
              </div>
            );
          })}
        </div>


                </main>
                </>
            );
        };
        
        export default ChallengeHub;
        


















