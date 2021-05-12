/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
import GenericHandler from '../helpers/responses';
import allStatus from '../helpers/statusKeys';
import state from '../helpers/messageCode';
import PostServices from '../../database/acid/services/postServices';
import GetToken from '../helpers/gettoken';

class PostController {
  static async addPost(req, res) {
    const userid = await GetToken.getAccessToken(req, res);

    const { title, description } = req.body;
    const postData = { userid, title, description };
    const result = await PostServices.createPost(postData);

    if (!result) {
      GenericHandler.error(res, allStatus.ACCESS_FOEBIDEN, state.FAILED_POST);
    }
    return GenericHandler.success(res, result, allStatus.SUCCESSFUL_CODE, state.SUCCESSFUL_POST);
  }

  static async getAllP(req, res) {
    const userid = await GetToken.getAccessToken(req, res);
    const result = await PostServices.getAllPost(userid);

    if (!result) {
      const resp = GenericHandler.error(res, allStatus.NOT_FOUND_CODE, state.NOT_FOUND_MESSAGE);
      return resp;
    }

    if (result === null) {
      GenericHandler.error(res, allStatus.NOT_FOUND_CODE, state.NOT_FOUND_MESSAGE);
    }
    GenericHandler.success(res, result, allStatus.SUCCESSFUL_CODE, state.RETREIVE_POSTS);
  }

  static async getSingleP(req, res) {
    const postId = req.params.post_id;
    const result = await PostServices.getSinglePost(postId);

    if (!result) {
      const resp = GenericHandler.error(res, allStatus.NOT_FOUND_CODE, state.NOT_FOUND_MESSAGE);
      return resp;
    }

    GenericHandler.success(res, result, allStatus.SUCCESSFUL_CODE, state.VALIDATE_MESSAGE);
  }

  static async updatePost(req, res) {
    const userid = await GetToken.getAccessToken(req, res);
    const postId = req.params.post_id;
    const { title, description } = req.body;
    const data = { title, description };

    const result = await PostServices.updatePost(data, userid, postId);

    if (!result) {
      const resp = GenericHandler.error(res, allStatus.NOT_FOUND_CODE, state.NOT_FOUND_MESSAGE);
      return resp;
    }

    const result1 = await PostServices.getOnepost(title);
    const { updatedAt } = result1;

    GenericHandler.success(res, {
      postId,
      userid,
      ...req.body,
      updatedAt,
    }, allStatus.SUCCESSFUL_CODE, state.DONE_CHANGES_MESSAGE);
  }

  static async deletePost(req, res) {
    const userid = await GetToken.getAccessToken(req, res);
    const postId = req.params.post_id;
    const result = await PostServices.deletePost(postId, userid);

    if (!result) {
      const resp = GenericHandler.error(res, allStatus.NOT_FOUND_CODE, state.NOT_FOUND_MESSAGE);
      return resp;
    }

    GenericHandler.correct(res, allStatus.SUCCESSFUL_CODE, state.ERASED_MESSAGE);
  }
}

export default PostController;
