import { Document, Schema, Model, model } from 'mongoose'
import { IUser } from './User'

export interface IPost extends Document {
  _id: string
  author: IUser['_id']
  fullName: string
  text: string
  image?: string
  likes: Like[]
  comments: Comment[]
  createdAt: string
  updatedAt: string
}

export interface Like {
  _id?: string
  user: IUser['_id']
}

export interface Comment {
  _id: string
  userID: IUser['_id']
  user: string
  text: string
}

const postSchema: Schema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: [],
    comments: [],
  },
  {
    timestamps: true,
  }
)

const Post: Model<IPost> = model('Post', postSchema)

export default Post
