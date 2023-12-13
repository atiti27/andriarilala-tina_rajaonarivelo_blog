import BaseModel from "@/db/models/BaseModel"

class PostModel extends BaseModel {
  static tableName = "posts"

  static get relationMappings() {
    return {
      author: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: "UserModel",
        join: {
          from: "posts.userId",
          to: "users.id",
        },
      },
      comments: {
        relation: BaseModel.HasManyRelation,
        modelClass: "CommentModel",
        join: {
          from: "posts.id",
          to: "comments.postId",
        },
      },
    }
  }
}

export default PostModel
