import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema (
    {
        videoFile: {
            type: String, // Cloudinary url
            required: true
        },
        thumbnail: {
            type: String, // Cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number, 
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    })

videoSchema.plugin(mongooseAggregatePaginate)
// above is : Mongoose middleware to add pagination functionality to your Video schema
export const Video = mongoose.model("Video", videoSchema)