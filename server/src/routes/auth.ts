import { Req, Res, Err, Router } from '../types'
import multer from 'multer'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import config from 'config'
import auth, { DecodedToken } from '../middleware/auth'
import User, { IUser } from '../models/User'
import { RegisterBody, LoginBody } from '../types/auth'
import Post, { IPost } from '../models/Post'
const router = Router()

// DESC:			verify user's token
// ACCESS:		private
// ENDPOINT:	/api/auth
router.get('/', auth, async (req: Req, res: Res) => {
  try {
    const user: IUser = await User.findById(req.userID).select('-password')

    return res.send(user)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

// DESC:			register new user
// ACCESS:		public
// ENDPOINT:	/api/auth/register
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/images/avatars')
  },
  filename: (req: Req, file, cb) => {
    const suffix = file.mimetype.replace('image/', '.')
    const imgId = v4()

    req.avatarID = `${imgId}${suffix}`
    cb(null, imgId + suffix)
  },
})
router.post(
  '/register',
  multer({
    storage: avatarStorage,
    fileFilter(req: Req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        return cb(new Error('File is not a valid image'))
      }

      cb(undefined, true)
    },
  }).single('avatar'),
  async (req: Req<RegisterBody>, res: Res) => {
    const { fullName, email, password } = req.body

    try {
      const userExists: IUser = await User.findOne({ email })
      if (userExists)
        return res.status(400).send({ message: 'User with this email already exists' })

      const newUser: IUser = new User({
        fullName,
        email,
        avatar: `/images/avatars/${req.avatarID}`,
      })
      newUser.password = await bcrypt.hash(password, 8)

      await newUser.save()

      const token = jwt.sign(
        { id: newUser.id } as DecodedToken,
        config.get('jwtSecret'),
        { expiresIn: 3600 }
      )

      return res.status(201).send({ token })
    } catch ({ message }) {
      console.log(message)
      return res.status(500).send({ message })
    }
  }
)

// DESC:			log in existing user
// ACCESS:		public
// ENDPOINT:	/api/auth/login
router.post('/login', async (req: Req<LoginBody>, res: Res) => {
  const { email, password } = req.body

  try {
    const user: IUser = await User.findOne({ email })
    if (!user) return res.status(400).send({ message: 'Bad email' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).send({ message: 'Bad password' })

    const token = jwt.sign({ id: user.id } as DecodedToken, config.get('jwtSecret'), {
      expiresIn: 3600,
    })

    return res.send({ token })
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

// DESC:			delete user and their posts
// ACCESS:		private
// ENDPOINT:	/api/auth/delete
router.delete('/delete', auth, async (req: Req, res: Res) => {
  try {
    const user: IUser = await User.findById(req.userID)
    // delete images here
    await Post.deleteMany({ author: req.userID })
    await user.remove()

    return res.send({ message: 'Account deleted successfully' })
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

export default router
