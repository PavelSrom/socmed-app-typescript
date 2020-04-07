import { Request, Response, NextFunction, Router, Errback } from 'express'

interface Req<T = {}> extends Request {
  userID?: string
  avatarID?: string
  postID?: string
  body: T
}
interface Res extends Response {}
interface Next extends NextFunction {}
interface Err extends Errback {}

export { Req, Res, Next, Err, Router }
