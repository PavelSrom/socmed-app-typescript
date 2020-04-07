import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ResponsiveContainer } from '../utils/Responsive'
import NewPostPanel from '../components/NewPostPanel'
import { Typography } from '@material-ui/core'
import { AppState } from '../store'
import { getPosts } from '../store/actions/posts'
import PostCard from '../components/PostCard'
import styles from '../styles/routes/Posts'

const Posts: React.FC = () => {
  const dispatch = useDispatch()
  const classes = styles()
  const posts = useSelector((state: AppState) => state.posts.posts)

  useEffect(() => {
    dispatch(getPosts())
    // eslint-disable-next-line
  }, [])

  return (
    <div className={classes.container}>
      <ResponsiveContainer style={{ paddingBottom: 56 }}>
        <NewPostPanel />
        <Typography variant="h6" className={classes.feed}>
          Your feed
        </Typography>

        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <Typography variant="body1">There are no posts</Typography>
        )}
      </ResponsiveContainer>
    </div>
  )
}

export default Posts
