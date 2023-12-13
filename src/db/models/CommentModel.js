import BaseModel from "@/db/models/BaseModel"

class CommentModel extends BaseModel {
  static tableName = "comments"

  static get relationMappings() {
    return {
      post: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: "PostModel",
        join: {
          from: "comments.postId",
          to: "posts.id",
        },
      },
      author: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: "UserModel",
        join: {
          from: "comments.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default CommentModel
