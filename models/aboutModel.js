import mongoose from 'mongoose'

const aboutSchema = mongoose.Schema(
    {
    title : {
        type : String,
        required : [true, 'Please add a title']
    },
    image : {
        type:String,
    },
    text : {
        type : String,
    }
},
{
    timestamps : true
}
)

export default mongoose.model('About', aboutSchema)
