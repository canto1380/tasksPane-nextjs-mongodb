import {Schema, model, models} from 'mongoose'

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Title must be less than 40 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [200, 'Description must be less than 200 characters']
  },
  finished: {
    type: Boolean,
    required: true,
    default: false
  },
  expiration: {
    type: Date,
    required: [true, 'Date es required'],
    trim: true
  }
},{
  timestamps: true,
  versionKey: false
})

export default models.Task || model("Task", taskSchema)

