const { Schema, model } = require('mongoose');

const answerSchema = require('./Answer')

const challengeSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
            unique: true,
        },
        correctAnswer: {
            type: String,
            required: true,
        },
        experience: {
            type: Number,
            required: true,
        },
        choices: [answerSchema],
    },
);

challengeSchema.methods.isCorrectAnswer = async function (answer) {
    if (answer === this.correctAnswer) {
        return true
    } else {
        return false
    }
};

const Challenge = model('Challenge', challengeSchema);

module.exports = Challenge;
