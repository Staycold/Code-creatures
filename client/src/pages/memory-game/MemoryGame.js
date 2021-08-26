import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client'
import { ADD_EXP, ADD_COINS } from '../../utils/mutations';
import './MemoryGame.css'


const MemoryGame = () => {

document.addEventListener('DOMContentLoaded', () => {

//commented out images until updated larger memory cards can be made

    const arrayCards = [
        {
            name: 'equal-to',
          //  img: './images/equal-to.png'
        },
        {
            name: 'equal-to',
         //   img: './images/equal-to.png'
        },
        {
            name: 'greater-than-or-equal-to',
          //  img: './images/greater-equal.png'
        },
        {
            name: 'greater-than-or-equal-to',
         //   img: './images/greater-equal.png'
        },
        {
            name: 'greater-than',
          //  img: './images/greater-than.png'
        },
        {
            name: 'greater-than',
         //   img: './images/greater-than.png'
        },
        {
            name: 'less-than-or-equal-to',
          //  img: './images/less-equal.png'
        },
        {
            name: 'less-than-or-equal-to',
          //  img: './images/less-equal.png'
        },
        {
            name: 'less-than',
           // img: './images/less-than.png'
        },
        {
            name: 'less-than',
           // img: './images/less-than.png'
        },
        {
            name: 'not-equal',
           // img: './images/not-equal.png'
        },
        {
            name: 'not-equal',
           // img: './images/not-equal.png'
        },
        {
            name: 'precisely-equal',
          //  img: './images/precisely-equal.png'
        },
        {
            name: 'precisely-equal',
          //  img: './images/precisely-equal.png'
        },
        {
            name: 'ternary-operator',
           // img: './images/ternary-operator.png'
        },
        {
            name: 'ternary-operator',
           // img: './images/ternary-operator.png'
        }
    ]
    
    arrayCards.sort(() => 0.5 - Math.random())
    
    
    const gameBoard = document.querySelector('.grid')
    let score = document.querySelector('#result')
    let chosenCards = []
    let chosenCardsId = []
    let matchedCards = []
    
    function loadBoard() {
        for (let i = 0; i < arrayCards.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', './images/MEMORY-DEFAULT.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', cardFlip)
            gameBoard.appendChild(card)
        }
    }
    
    function checkMatch() {
        let cards = document.querySelectorAll('img')
        const firstOption = chosenCardsId[0]
        const secondOption = chosenCardsId[1]
        console.log(cards)
        console.log(firstOption)
        console.log(secondOption)
        if (chosenCards[0] === chosenCards[1]) {
            alert("Match found!")
            cards[firstOption].setAttribute('src', './images/blank.png')
            cards[secondOption].setAttribute('src', './images/blank.png')
            matchedCards.push(chosenCards)
        } else {
            console.log(cards[firstOption])
            cards[firstOption].setAttribute('src', './images/MEMORY-DEFAULT.png')
            cards[secondOption].setAttribute('src', './images/MEMORY-DEFAULT.png')
            alert('Please try again!')
        }
        chosenCards = []
        chosenCardsId = []
        score.textContent = matchedCards.length
        if (matchedCards.length === arrayCards.length/2) {
            score.textContent = "Congrats! You found them all!"
        }
    }
    
    
    function cardFlip() {
        let cardId = this.getAttribute('data-id');
        chosenCards.push(arrayCards[cardId].name);
        chosenCardsId.push(cardId)
        this.setAttribute('src', arrayCards[cardId].img)
        if (chosenCards.length === 2) {
            setTimeout(checkMatch, 500)
        }
    }
    
    
    
    loadBoard();
    
    
    
    })


    return (
    <main>
    <h3><span id="result"></span></h3>

  <div class="grid">
  </div>
  </main>
    )
}

export default MemoryGame;