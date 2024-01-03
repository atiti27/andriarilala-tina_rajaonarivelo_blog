import clsx from "clsx"

const Loader = ({ className, ...otherProps }) => (
  <div
    className={clsx(
      className,
      "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-slate-500 motion-reduce:animate-[spin_1.5s_linear_infinite]",
    )}
    role="status"
    {...otherProps}
  >
    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
      Loading...
    </span>
  </div>
)

export default Loader