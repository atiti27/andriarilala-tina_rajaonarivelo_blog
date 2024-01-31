import PostModel from "@/db/models/PostModel"
import UserModel from "@/db/models/UserModel"
import BaseModel from "@/db/models/BaseModel"

class PostsViewsModel extends BaseModel {
  static tableName = "postsViews"

  static get relationMappings() {
    return {
      post: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: PostModel,
        join: {
          from: "postsViews.postId",
          to: "posts.id",
        },
      },
      viewer: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "postsViews.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default PostsViewsModel
