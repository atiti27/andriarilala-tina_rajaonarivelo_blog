import Button from "@/web/components/ui/Buttons/Button"
import { useFormikContext } from "formik"

const SubmitButton = ({ disabled, ...otherProps }) => {
  const { isSubmitting, isValid } = useFormikContext()

  return (
    <Button
      disabled={disabled || isSubmitting || !isValid}
      type="submit"
      {...otherProps}
    />
  )
}

export default SubmitButton
