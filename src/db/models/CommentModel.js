import BaseModel from "@/db/models/BaseModel"

class CommentModel extends BaseModel {
  static tableName = "comments"

  static get relationMappings() {
    return {
      post: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: "PostModel",
        join: {
          from: "comments.post_id",
          to: "posts.id",
        },
      },
      author: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: "UserModel",
        join: {
          from: "comments.user_id",
          to: "users.id",
        },
      },
    }
  }
}

export default CommentModel

// Structure de la table comments
// id
// post_id(clé étrangère vers la table posts)
// user_id(clé étrangère vers la table users)
// content
// createdAt
// Pas de updatedAt car pas de modification du commentaire
