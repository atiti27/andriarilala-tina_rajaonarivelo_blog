import BaseModel from "@/db/models/BaseModel"

class PostModel extends BaseModel {
  static tableName = "posts"

  static get relationMappings() {
    return {
      author: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: "UserModel",
        join: {
          from: "posts.user_id",
          to: "users.id",
        },
      },
      comments: {
        relation: BaseModel.HasManyRelation,
        modelClass: "CommentModel",
        join: {
          from: "posts.id",
          to: "comments.post_id",
        },
      },
    }
  }
}

export default PostModel

// Structure de la table posts
// id
// title
// content
// user_id(clé étrangère vers la table users)
// createdAt
// updatedAt
