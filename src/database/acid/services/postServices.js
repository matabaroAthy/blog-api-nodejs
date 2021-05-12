/* eslint-disable linebreak-style */
import db from '../../definitions/models';

class PostServices {
  static async createPost(postData) {
    const result = await db.Post.create(postData);
    return result;
  }

  static async getAllPost(id) {
    const result = await db.Post.findAll({ where: { userId: id } });
    return result;
  }

  static async getOnepost(title) {
    const result = await db.Post.findOne({ where: { title } });
    return result;
  }

  static async getOnepostByTD(title, description) {
    const result = await db.Post.findOne({ where: { title, description } });
    return result;
  }

  static async getSinglePost(id) {
    const result = await db.Post.findOne({ where: { id } });
    return result;
  }

  static async updatePost(data, userid, id) {
    const result = await db.Post.update(data, { where: { userid, id } });
    return result;
  }

  static async deletePost(id, userid) {
    const result = await db.Post.destroy({ where: { id, userid } });
    return result;
  }
}

export default PostServices;
