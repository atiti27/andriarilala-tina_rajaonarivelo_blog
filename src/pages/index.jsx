import Button from "@/web/components/ui/Buttons/Button"
import { useRouter } from "next/router"

const IndexPage = () => {
  const router = useRouter()
  const handleClick = (path) => () => {
    router.push(path)
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="p-4 text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">
        Welcome to the Blog App
      </h1>
      <div className="p-4 flex flex-row items-center justify-center gap-4">
        <Button
          variant="secondary"
          className={"rounded-md shadow-md hover:bg-slate-400"}
          onClick={handleClick("/sign-in")}
        >
          Sign In
        </Button>
        <Button
          variant="secondary"
          href="/sign-up"
          className={"rounded-md shadow-md hover:bg-slate-400"}
          onClick={handleClick("/sign-up")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  )
}

export default IndexPage
