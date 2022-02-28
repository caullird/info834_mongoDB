(async () => {
    // Requiring module
    const mongoose = require('mongoose');
    
    // Connecting to database
    await mongoose.connect('mongodb://127.0.0.1:27017/Mailing');
    
// Creating Schemas
    const UserSchema = new mongoose.Schema({
        id: String,
        name: String,
        firstname: String,
        email: String,
    });
    
    const ListSchema = new mongoose.Schema({
        id: String,
        name: String,
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
    })
    
    // Creating models from userSchema and postSchema
    const User = mongoose.model("User", UserSchema);
    const List = mongoose.model("Lists", ListSchema);

    let list1 = await List.findOne({name: "Mailing-List 1"}).populate("users");

    // process.exit()
})();
