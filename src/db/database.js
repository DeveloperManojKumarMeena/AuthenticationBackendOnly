const mongoose = require('mongoose');

function CTDB() {

    mongoose.connect(process.env.MongoDB_Uri)
    try {
        console.log("Server Connect to Data Base...")
    } catch (error) {
        console.log(error)
    }
}

module.exports=CTDB