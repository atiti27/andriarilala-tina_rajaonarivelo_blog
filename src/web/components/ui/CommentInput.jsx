import clsx from "clsx"
import { useField } from "formik"

const CommentInput = (props) => {
  const { name, label, className, ...otherProps } = props
  const [field] = useField(name)

  return (
    <div className="flex flex-col gap-4 mb-4">
      <label className={clsx("flex flex-col gap-2", className)}>
        <span className="font-semibold text-sm">{label}</span>
        <div className="flex gap-2">
          <textarea
            name="content"
            className="w-full p-2 border-2 border-slate-400 min-h-[48px] min-w-[48px] resize-none rounded-lg text-base flex-1 border-solid"
            rows="1"
            placeholder="Enter your comment"
            {...field}
            {...otherProps}
          />
          <button
            type="submit"
            className="relative z-30 px-8 py-3 h-12 font-sans disabled:cursor-auto border-none cursor-pointer bg-indigo-800 text-white font-semibold rounded-lg transition"
          >
            Send
          </button>
        </div>
      </label>
    </div>
  )
}

export default CommentInput
