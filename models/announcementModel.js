import mongoose from 'mongoose'

const announcementSchema = mongoose.Schema(
    {
    title : {
        type : String,
        required : [true, 'Please add a title']
    },
    image : {
        type:String,
    }
},
{
    timestamps : true
}
)

export default mongoose.model('Announcement', announcementSchema)
