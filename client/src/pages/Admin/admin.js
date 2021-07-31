import React, { useState } from 'react'
import Auth from '../../utils/auth'
import { useMutation } from '@apollo/client';
import { ADD_CHALLENGE } from '../../utils/mutations';

const AddChallenge = () => {

    const [challengeData, setChallengeData ] = useState({question:'', correctAnswer:'', choices:[]})

    const [addQuestion] = useMutation(ADD_CHALLENGE)

    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setChallengeData({ ...challengeData, [name]: [value] });
      };



      const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        try {
       const { data } = await addQuestion ({
         variables:{ ...challengeData }
       })
    
      
          
        } catch (err) {
          console.error(err);
          
        }
    
        setChallengeData({
            question:'',
            correctAnswer:'',
            choices:[],
        });
        
       
      };

      console.log( challengeData)
      return (
        <>
          
          <form noValidate onSubmit={handleFormSubmit}>
           
    
            <div>
              <h2 htmlFor='question'>Question</h2>
              <input
                type='text'
                placeholder='Question'
                name='question'
                onChange={(event) => handleInputChange(event)}
                value={challengeData.question}
                required
              />
              
            </div>
    
            <div>
              <h2 htmlFor='correctAnswer'>Answer</h2>
              <input
                type='text'
                placeholder='Answer'
                name='correctAnswer'
                onChange={(event) => handleInputChange(event)}
                value={challengeData.correctAnswer}
                required
              />
              
            </div>
    
            <div>
              <h2 htmlFor='choices1'>Choice one</h2>
              <input
                type='text'
                placeholder='Your choices'
                name='choices'
                onChange={(event) => handleInputChange(event)}
                value={challengeData.choices}
                required
              />
              
            </div>

            <div>
              <h2 htmlFor='choices2'>Choice two</h2>
              <input
                type='text'
                placeholder='Your choices'
                name='choices'
                onChange={(event) => handleInputChange(event)}
                value={challengeData.choices}
                required
              />
              
            </div>

            <div>
              <h2 htmlFor='choices3'>Choice three</h2>
              <input
                type='text'
                placeholder='Your choices'
                name='choices'
                onChange={(event) => handleInputChange(event)}
                value={challengeData.choices}
                required
              />
              
            </div>
            <button
            //   disabled={!(challengeData.username && challengeData.correctAnswer && challengeData.choices)}
              type='submit'
              variant='success'>
              Submit
            </button>
          </form>
        </>
      );

}

export default AddChallenge;