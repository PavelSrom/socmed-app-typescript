import React, { useState } from 'react'
import { createNewPost } from '../store/actions/posts'
import { Paper, TextField, IconButton, Button, Typography } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { useDispatch } from 'react-redux'
import styles from '../styles/components/NewPostPanel'

interface NewPost {
  text: string
  image: any
}

const NewPostPanel: React.FC = () => {
  const dispatch = useDispatch()
  const classes = styles()
  const [newPost, setNewPost] = useState<NewPost>({
    text: '',
    image: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'image') {
      setNewPost({ ...newPost, image: e.target.files![0] })
    } else {
      setNewPost({ ...newPost, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newPost.text) dispatch(createNewPost(newPost))

    setNewPost({ text: '', image: null })
  }

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="text"
          label="What's on your mind?"
          value={newPost.text}
          onChange={handleChange}
        />
        <div className={classes.flex}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="icon-button-file"
            type="file"
            name="image"
            onChange={handleChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          {newPost.image && <Typography variant="body2">{newPost.image.name}</Typography>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ alignSelf: 'center' }}
          >
            Post
          </Button>
        </div>
      </form>
    </Paper>
  )
}

export default NewPostPanel
