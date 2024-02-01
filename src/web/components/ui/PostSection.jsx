import { formatDate } from "@/utils/dateFormatters"

const PostSection = (props) => {
  const { post, handleClick, isAuthor } = props

  return (
    <section
      className="flex flex-col p-3 rounded-md hover:cursor-pointer bg-indigo-100 hover:bg-indigo-200 drop-shadow-md  overflow-hidden gap-1"
      onClick={handleClick(post.id)}
    >
      <h2 className="font-bold text-xl p-1">{post.title}</h2>
      <p className=" line-clamp-2">{post.content}</p>
      {isAuthor && (
        <p>
          By <strong className="font-semibold">{post.author.username}</strong>
        </p>
      )}
      <p className="text-gray-600 italic">
        Updated at {formatDate(post.updatedAt)}
      </p>
    </section>
  )
}

export default PostSection
