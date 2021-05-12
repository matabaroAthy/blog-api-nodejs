/* eslint-disable linebreak-style */
import { Router } from 'express';
import postController from '../../modules/postController';
import Validator from '../../middleware/validator';

const postRoutes = Router();

postRoutes.post('/blog/addpost', postController.addPost);
postRoutes.get('/blog/posts', postController.getAllP);
postRoutes.get('/blog/posts/:post_id', postController.getSingleP);
postRoutes.put('/blog/posts/:post_id', Validator.startBlog, postController.updatePost);
postRoutes.delete('/blog/posts/:post_id', postController.deletePost);

export default postRoutes;
