(async () => {
    // Requiring module
    const mongoose = require('mongoose');
    const { Schema } = mongoose;

    // Connecting to database
    await mongoose.connect('mongodb://127.0.0.1:27017/Mailing');
    
    // Creating Schemas
    const UserSchema = new mongoose.Schema({
        id: Schema.Types.ObjectId,
        name: String,
        firstname: String,
        email: String,
    });
    
    const ListSchema = new mongoose.Schema({
        id: Schema.Types.ObjectId,
        name: String,
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
    })
    
    // Creating models from userSchema and postSchema
    const List = mongoose.model("Lists", ListSchema);
    const User = mongoose.model("User", UserSchema);

    module.exports = {
        List, User
    }
    
    List.find({"name" : "Mailing-List 1"})
        .populate("users")
        .exec(function (err, res){
            if (err) throw err;
            console.log(res)
        });

    // process.exit()
})();