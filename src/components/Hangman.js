import React, { Component } from 'react';
import './Hangman.css';
import { randomWord } from './Words.js';

class Hangman extends Component {
    static defaultProps = {
        maxWrong: 6,
    }

    constructor(props) {
        super(props);
        this.state = {
            word: randomWord(),
            guessed: new Set([]),
            mistakes: 0,
        }
    }

    secretWord() {
        return this.state.word.split("").map((letter, index) => {
            if(index == 0 || index == this.state.word.length-1) {
                return " " + letter;
            }
            return this.state.guessed.has(letter) ? (" " + letter) : " _";
        });
    } 

    handleGuess = e => {
        let letter = e.target.value;
        this.setState(state => ({
            guessed: state.guessed.add(letter),
            mistakes: state.mistakes + (state.word.includes(letter) ? 0 : 1),
        }));
        this.checkStatus();
    }

    displayLetters() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => {
            return <button className="m-2" key={letter} value={letter} 
                    onClick={this.handleGuess}
                    disabled={this.state.guessed.has(letter)}
                    >
                    { letter }
                    </button>
        });
    }

    inactiveLetters() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => {
            return <button className="m-2" key={letter}
                    disabled
                    >
                    { letter }
                    </button>
        });
    }
    
    playAgain = () => {
        this.setState({
            mistakes: 0,
            guessed: new Set([]),
            word: randomWord(),
        })
    }


    checkStatus() {
        if(this.state.mistakes >= this.props.maxWrong) {
            return "You Lost!";
        }
        console.log(this.secretWord().join(""))
        if(this.secretWord().join("").replace(/\s/g, '') === this.state.word) {
            return "You Win!";
        }
        return "";
    }

    render() {
        let message = this.checkStatus();
        return (
            <div className="Hangman  container">
                <h2>Hangman</h2>
                <p>{ this.state.word }</p>
                <div>
                    Wrong guesses: { this.state.mistakes } out of { this.props.maxWrong }
                </div>
                <div>
                <canvas id='hangmanCanvas'></canvas>
                </div>
                <div>
                    { this.secretWord() }
                </div>
                <div>
                    { message == "" ? this.displayLetters() : this.inactiveLetters()}
                </div>
                <div>
                    { message }
                </div>
                <div>
                    <button className="btn btn-info" onClick={this.playAgain}>
                    Play Again</button>
                </div>
            </div>
        );
    }
}

export default Hangman;
