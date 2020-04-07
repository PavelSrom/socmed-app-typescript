import { Document, Schema, Model, model } from 'mongoose'

export interface IUser extends Document {
  _id: string
  email: string
  password?: string // not shown in React, hence optional
  fullName: string
  avatar: string
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  fullName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
})

const User: Model<IUser> = model('User', userSchema)

export default User
