import React from 'react';
import { GET_CHALLENGE } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import imgs from '../../images';
import './challengeHub.css'

// page to display all the challenges
const ChallengeHub = () => {

  const { loading, data } = useQuery(GET_CHALLENGE)
  const challenge = data?.challenges || {};

  if (loading) {
    return <div> Loading...</div>
  }

  return (
    <>
      <img id="cloudOne" src={imgs.cloud1} alt="cloud sprite 1" />
      <img id="cloudTwo" src={imgs.cloud3} alt="cloud sprite 2" />
      <img id="challengesun" src={imgs.sun} alt="sun sprite" />
      <img id="cloudThree" src={imgs.cloud1} alt="cloud sprite 1" />
      <img id="cloudFour" src={imgs.cloud3} alt="cloud sprite 2" />
      <main className='hubBg'>
        <div>

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
                  {/* <h2>{question.question}</h2>  */}
                  <h2 className='linkTxt'>Challenge #{question._id} 📝</h2>
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



















