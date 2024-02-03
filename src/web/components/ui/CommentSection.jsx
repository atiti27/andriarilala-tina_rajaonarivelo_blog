import { calculateDeltaTime } from "@/utils/dateFormatters"

const CommentSection = (props) => {
  const { comment } = props

  return (
    <div key={comment?.id} className="border rounded-md p-2">
      <p className="font-semibold mb-2">{comment.author.username}</p>
      <p className="font-light">{comment.content}</p>
      <p className="text-gray-600 italic">
        Published {calculateDeltaTime(comment.createdAt)}
      </p>
    </div>
  )
}

export default CommentSection
