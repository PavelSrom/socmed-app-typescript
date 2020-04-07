import { Req, Res, Err, Next, Router } from '../types'
import multer from 'multer'
import { v4 } from 'uuid'
import auth from '../middleware/auth'
import Post, { IPost, Like, Comment } from '../models/Post'
import { CreatePostBody, CreateComBody } from '../types/posts'
import User, { IUser } from '../models/User'
const router = Router()

// DESC:			get all posts
// ACCESS:		private
// ENDPOINT:	/api/posts
router.get('/', auth, async (req: Req, res: Res) => {
  try {
    const posts: IPost[] = await Post.find().sort({ createdAt: -1 })

    return res.send(posts)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

// DESC:			add a new post
// ACCESS:		private
// ENDPOINT:	/api/posts
const postStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/images/posts')
  },
  filename: (req: Req, file, cb) => {
    const suffix = file.mimetype.replace('image/', '.')
    const imgId = v4()

    req.postID = `${imgId}${suffix}`
    cb(null, imgId + suffix)
  },
})
router.post(
  '/',
  [
    auth,
    multer({
      storage: postStorage,
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
          cb(new Error('File is not a valid image'))
        }

        cb(undefined, true)
      },
      limits: {
        fileSize: 500000,
      },
    }).single('image'),
  ],
  async (req: Req<CreatePostBody>, res: Res) => {
    try {
      const user: IUser = await User.findById(req.userID)
      if (!user) return res.status(404).send({ message: 'User not found' })

      const newPost: IPost = new Post({
        author: req.userID,
        fullName: user.fullName,
        text: req.body.text,
      })
      if (req.postID) newPost.image = `/images/posts/${req.postID}`

      await newPost.save()

      return res.status(201).send(newPost)
    } catch ({ message }) {
      console.log('here we go')
      console.log(message)
      return res.status(500).send({ message })
    }
  },
  (err: any, req: Req, res: Res, next: Next) => {
    console.log(err)
    return res.status(400)
  }
)

// DESC:			like a post
// ACCESS:		private
// ENDPOINT:	/api/posts/:id/like
router.post('/:id/like', auth, async (req: Req, res: Res) => {
  try {
    const post: IPost = await Post.findById(req.params.id)
    if (!post) return res.status(404).send({ message: 'Post not found' })

    const alreadyLiked = post.likes.some(({ user }) => user.toString() === req.userID)
    if (alreadyLiked)
      return res.status(400).send({ message: 'You already liked this post' })

    const newLike: Like = { user: req.userID }
    post.likes.push(newLike)
    await post.save()

    return res.status(201).send(post)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

// DESC:			dislike a post
// ACCESS:		private
// ENDPOINT:	/api/posts/:id/like
router.delete('/:id/like', auth, async (req: Req, res: Res) => {
  try {
    const post: IPost = await Post.findById(req.params.id)
    if (!post) return res.status(404).send({ message: 'Post not found' })

    const hasLike = post.likes.some(({ user }) => user.toString() === req.userID)
    if (!hasLike) return res.status(400).send({ message: 'You did not like this post' })

    post.likes = post.likes.filter(({ user }) => user.toString() !== req.userID)
    await post.save()

    return res.send(post)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

// DESC:			add a comment
// ACCESS:		private
// ENDPOINT:	/api/posts/:id/comment
router.post('/:id/comment', auth, async (req: Req<CreateComBody>, res: Res) => {
  try {
    const post: IPost = await Post.findById(req.params.id)
    if (!post) return res.status(404).send({ message: 'Post not found' })

    const user: IUser = await User.findById(req.userID)
    if (!user) return res.status(404).send({ message: 'User not found' })

    const newComment: Comment = {
      _id: v4(),
      userID: req.userID,
      user: user.fullName,
      text: req.body.text,
    }
    post.comments.unshift(newComment)
    await post.save()

    return res.status(201).send(post)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

// DESC:			remove a comment
// ACCESS:		private
// ENDPOINT:	/api/posts/:postId/:commentId
router.delete('/:postId/:commentId', auth, async (req: Req, res: Res) => {
  try {
    const post: IPost = await Post.findById(req.params.postId)
    if (!post) return res.status(404).send({ message: 'Post not found' })

    const user: IUser = await User.findById(req.userID)
    if (!user) return res.status(404).send({ message: 'User not found' })

    const targetComment: Comment = post.comments.find(
      ({ _id }) => req.params.commentId === _id
    )
    if (!targetComment) return res.status(404).send({ message: 'Comment not found' })
    if (targetComment.userID.toString() !== req.userID)
      return res.status(403).send({ message: 'Access denied' })

    post.comments = post.comments.filter(({ _id }) => _id !== targetComment._id)
    await post.save()

    return res.send(post)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

export default router
