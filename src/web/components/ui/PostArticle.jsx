import { formatDate } from "@/utils/dateFormatters"

const PostArticle = (props) => {
  const { post, kpis, ...otherProps } = props

  return (
    <article
      key={post?.id}
      className="border-2 rounded-md min-w-[600px]"
      {...otherProps}
    >
      <div className="p-2">
        <div className="flex flex-col p-2">
          <h1 className="text-3xl font-semibold p-2 items-center">
            {post?.title}
          </h1>
          <p className="font-semibold">By {post?.author.username}</p>
        </div>
        <p>{post?.content}</p>
        <p className="text-gray-600 italic py-2">
          Last edited: {formatDate(post?.updatedAt)}
        </p>
      </div>
      <div className="inline-flex items-center p-2 divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse bg-indigo-200 w-full">
        <p className="font-semibold px-2">👁️ {kpis?.viewsCount}</p>
        <p className="font-semibold px-2">💬 {kpis?.commentsCount}</p>
      </div>
    </article>
  )
}

export default PostArticle
