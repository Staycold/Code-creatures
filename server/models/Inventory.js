const { Schema, model } = require('mongoose');

const inventorySchema = new Schema(

    {
        coins: {
            type: Number,
            required: true,
            default: 50,
        },
        food1: {
            type: Number,
            required: true,
            default: 0,
        },
        food2: {
            type: Number,
            required: true,
            default: 0,
        },
        food3: {
            type: Number,
            required: true,
            default: 0,
        },
    },
);


const Inventory = model('Inventory', inventorySchema);

module.exports = {
    inventorySchema
};

