import { useField } from "formik"

const CreationPostBox = (props) => {
  const { name } = props
  const [field] = useField(name)

  return (
    <>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse">
            <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
              <p>✏️</p>
            </div>
            <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
              <p className="font-semibold">New post</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-2 bg-white rounded-b-lg">
          <label className="sr-only">Publish post</label>
          <textarea
            rows="8"
            name={name}
            className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0"
            placeholder="Write an article..."
            required
            {...field}
          />
        </div>
      </div>
    </>
  )
}

export default CreationPostBox
