import clsx from "clsx"

const variants = {
  primary: "bg-indigo-500 active:bg-indigo-700 text-white",
}
const sizes = {
  sm: "px-3 py-2 text-xl font-semibold",
  md: "px-5 py-2.5 text-sm font-medium",
}
const Button = ({
  variant = "primary",
  size = "md",
  className,
  ...otherProps
}) => (
  <button
    className={clsx(
      " disabled:bg-slate-200 disabled:text-black",
      variants[variant],
      sizes[size],
      className,
    )}
    {...otherProps}
  />
)

export default Button
