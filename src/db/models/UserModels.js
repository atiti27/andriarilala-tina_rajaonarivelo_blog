import BaseModel from "@/db/models/BaseModel"

class UserModel extends BaseModel {
  static tableName = "users"

  static get relationMappings() {
    return {
      posts: {
        relation: BaseModel.HasManyRelation,
      },
    }
  }
}

export default UserModel

// Structure de la table users
// id
// username
// email
// password
// isAdmin
// isAuthor
// createdAt
// updatedAt
