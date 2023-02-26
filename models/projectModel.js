import mongoose, { model } from 'mongoose';

const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image: {
        type:String,
       
    }
    
},{ timestamps: true});

const Project = model('Project', projectSchema);
export default Project;
