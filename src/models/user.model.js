import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
// Import {Schema} -> now directly Schema instead of mongoose.Schema

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName:{
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar:{
            type: String, // Cloudinary url
            required: true
        },
        coverImage:{
            type: String // Cloudinary url
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password:{
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken:{
            type: String
        }
    }, 
    {
        timestamps: true
    }
)

// pre means just before 'save', call this middleware
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next(); // if password not modified, next()
    // encrypts the password
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
// now we are not using arrow function, as it doesn't have 'this.' functionality, so referring can cause problem

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessTokens = function(){
    return jwt.sign(
        {
            _id: this._id, // we get from mongodb
            email: this.email,
            username: this.username,
            fullName: this.fullName
            // left: payload name, right: getting info from database
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    // generates token
}
userSchema.methods.generateRefreshTokens = function(){
    return jwt.sign(
        {
            _id: this._id, // we get from mongodb
            // left: payload name, right: getting info from database
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)