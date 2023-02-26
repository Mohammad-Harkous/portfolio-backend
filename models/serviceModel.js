import mongoose from 'mongoose'

const serviceSchema = mongoose.Schema(
    {
    title : {
        type : String,
        required : [true, 'Please add a title']
    },
    description : {
        type : String,
        required : [true, 'Please add a description']
    }
},
{
    timestamps : true
}
)

export default mongoose.model('Service', serviceSchema)

