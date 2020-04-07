import React, { useState } from 'react'
import moment from 'moment'
import styles from '../styles/components/PostCard'
import {
  Paper,
  Typography,
  Divider,
  Button,
  Collapse,
  TextField,
  IconButton,
} from '@material-ui/core'
import { IPost } from '../../../src/models/Post'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ChatBubble from '@material-ui/icons/ChatBubble'
import Send from '@material-ui/icons/Send'
import Close from '@material-ui/icons/Close'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { addLike, removeLike, addComment, removeComment } from '../store/actions/posts'

interface Props {
  post: IPost
}

const PostCard: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch()
  const classes = styles()
  const loggedUser = useSelector((state: AppState) => state.auth.user)

  const [commentsOpen, setCommentsOpen] = useState<boolean>(false)
  const [commentText, setCommentText] = useState<string>('')

  const alreadyLiked = post.likes.some(({ user }) => user === loggedUser!._id)
  const handleLike = () => {
    alreadyLiked ? dispatch(removeLike(post._id)) : dispatch(addLike(post._id))
  }

  const handleComment = () => {
    setCommentsOpen(!commentsOpen)
  }

  const submitNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (commentText) dispatch(addComment(post._id, commentText))

    setCommentText('')
  }

  return (
    <Paper className={classes.paper}>
      {/* post data */}
      <div className={classes.flex}>
        <Typography variant="body1" className={classes.name}>
          {post.fullName}
        </Typography>
        <Typography variant="body1">
          {moment(post.createdAt).format('MMMM Mo, h:mm a')}
        </Typography>
      </div>
      {post.image && <img src={post.image} alt="" className={classes.img} />}
      <Typography variant="body1">{post.text}</Typography>
      <Divider className={classes.divider} />

      {/* number of likes and comments */}
      {(post.likes.length > 0 || post.comments.length > 0) && (
        <>
          <div className={classes.buttonBox}>
            <Typography variant="body2">{post.likes.length} likes</Typography>
            <Typography variant="body2">{post.comments.length} comments</Typography>
          </div>
          <Divider className={classes.divider} />
        </>
      )}

      {/* buttons */}
      <div className={classes.buttonBox}>
        <Button
          color={alreadyLiked ? 'secondary' : 'primary'}
          onClick={handleLike}
          startIcon={<ThumbUp />}
        >
          Like
        </Button>
        <Button color="primary" onClick={handleComment} startIcon={<ChatBubble />}>
          Comment
        </Button>
      </div>

      {/* comment form */}
      <Divider className={classes.divider} />
      <Collapse in={commentsOpen}>
        <form
          onSubmit={submitNewComment}
          className={classes.buttonBox}
          style={{ alignItems: 'center', marginBottom: 8 }}
        >
          <TextField
            autoComplete=""
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{ flex: 1 }}
            placeholder="Your comment..."
          />
          <Button type="submit" component={IconButton}>
            <Send className={classes.sendIcon} />
          </Button>
        </form>

        {/* comments */}
        {post.comments.map(({ _id, text, user, userID }) => (
          <div key={_id} className={classes.commentBubble}>
            <div className={classes.buttonBox} style={{ alignItems: 'center' }}>
              <Typography variant="body2" style={{ fontWeight: 'bolder' }}>
                {user}
              </Typography>
              {userID === loggedUser!._id && (
                <IconButton
                  size="small"
                  onClick={() => dispatch(removeComment(post._id, _id))}
                >
                  <Close />
                </IconButton>
              )}
            </div>
            <Typography variant="body2">{text}</Typography>
          </div>
        ))}
      </Collapse>
    </Paper>
  )
}

export default PostCard
