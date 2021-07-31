import React, { useState } from 'react'
import Auth from '../../utils/auth'
import { useMutation } from '@apollo/client';
import { ADD_CHALLENGE } from '../../utils/mutations';

const AddChallenge = () => {

    const [challengeData, setChallengeData ] = useState({question:'', correctAnswer:''})
    const [choice1Data, setChoice1Data ] = useState('')
    const [choice2Data, setChoice2Data ] = useState('')
    const [choice3Data, setChoice3Data ] = useState('')

    const [addQuestion] = useMutation(ADD_CHALLENGE)

    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch(name){
          case "question":
            case  "correctAnswer":{
              setChallengeData({...challengeData, [name]:value});
              break;
          }
          case "choice1": {
              setChoice1Data(value);
              break;
          }
          case "choice2": {
              setChoice2Data(value);
              break;
          }
          case "choice3": {
              setChoice3Data(value);
              break;
          }
          default:{
          break
        }
      }
      };



      const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        const choiceArr = [choice1Data, choice2Data, choice3Data]
        console.log({ ...challengeData, choices: choiceArr })
        try {
       const { data } = await addQuestion ({
         variables:{challenge:{ ...challengeData, choices: choiceArr }}
       })
    
      
          
        } catch (err) {
          console.error(err);
          
        }
    
        setChallengeData({
            question:'',
            correctAnswer:'',
            choices:[],
        });
        setChoice1Data('')
        setChoice2Data('')
        setChoice3Data('')
       
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
                name='choice1'
                onChange={(event) => handleInputChange(event)}
                value={choice1Data}
                required
              />
              
            </div>

            <div>
              <h2 htmlFor='choices2'>Choice two</h2>
              <input
                type='text'
                placeholder='Your choices'
                name='choice2'
                onChange={(event) => handleInputChange(event)}
                value={choice2Data}
                required
              />
              
            </div>

            <div>
              <h2 htmlFor='choices3'>Choice three</h2>
              <input
                type='text'
                placeholder='Your choices'
                name='choice3'
                onChange={(event) => handleInputChange(event)}
                value={choice3Data}
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