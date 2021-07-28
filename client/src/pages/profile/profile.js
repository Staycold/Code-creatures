import React from 'react';

const Profile = () => {
    // THIS IS THE PETDATA OBJECT
    let petData

    // petData = {
    //     name: "testpet",
    //     experience: 0,
    //     level: 1,
    // }

    const submitNewPet = (event) => {
        event.preventDefault();
        const petData = {
            name: "this is where name will go",
            experience: 0,
            level: 1,
            happiness:0,
            sprite: event.target.dataset.sprite,
        }
        // MUTATION TO ADD PET
        console.log(petData)
    } 

    if (!petData) {
        return (
            <main>
                <div>
                    CHOOSE A PET
                </div>
                <div data-sprite="1a" onClick={(event) => submitNewPet(event)}>
                    PET 1
                </div>
                <div data-sprite="2a" onClick={(event) => submitNewPet(event)}>
                    PET 2
                </div>
                <div data-sprite="3a" onClick={(event => submitNewPet(event))}>
                    PET 3
                </div>
            </main>
        )
    }

    return (
        <main>
            <div>
                {/* IMAGE OF SPRITE THAT USES petData.sprite */}
                <p>Name:{petData.name}</p>
                <p>Experience:{petData.experience}</p>
                <p>Level:{petData.level} </p>
                {/* BTN TO FEED FOOD */}
                {/* MAP OF INVENTORY FOR FOOD? */}
            </div>
        </main>
    );
};

export default Profile;


// IF NO PET, CHOOSE BETWEEN 3 PET DEFAULTS *DONE

// ESSENTIALLY THIS WILL BE THE PET PAGE
// SHOW EXPERIENCE / LEVEL / HAPPINESS LEVEL?
// CAN FEED FOOD HERE - CHANGES HAPPINESS LEVEL / EXPERIENCE LEVEL?
