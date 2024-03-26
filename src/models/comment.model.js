import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// pagination means how many comments to load ... like 1000 there , so show only first 100, then give option to load more! 
// it breaks down large sets of data into smaller ones

const commentSchema = new Schema(
    {
        content:{
            type: String,
            required: true
        },
        video:{
            type: Schema.Types.ObjectId,
            ref: "Video"
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }        
    },
    {
        timestamps: true
    }
)

commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = mongoose.model("Comment", commentSchema)