const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Your schema definition
});

// Only create the model if it doesn't exist
let User;
try {
    User = mongoose.model('User');
} catch (error) {
    User = mongoose.model('User', UserSchema);
}

module.exports = User;