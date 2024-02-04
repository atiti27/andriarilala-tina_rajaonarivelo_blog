import Button from "@/web/components/ui/Buttons/Button"
import Image from "next/image"
import blogImg from "../../public/blog-img.jpg"
import { useRouter } from "next/router"

const IndexPage = () => {
  const router = useRouter()
  const handleClick = (path) => () => {
    router.push(path)
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="p-4 text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-500">
        Welcome to the Blog App
      </h1>
      <Image src={blogImg} alt="blog" className="mt-4" />
      <div className="flex flex-row gap-4 divide-x-2 divide-indigo-300 py-2">
        <div className="p-4 flex flex-col items-center justify-center gap-2 w-1/2">
          <p>Already have an account?</p>
          <Button
            className={"rounded-md shadow-md hover:bg-slate-400"}
            onClick={handleClick("/sign-in")}
          >
            Sign In
          </Button>
        </div>
        <div className="p-4 flex flex-col items-center justify-center gap-2 w-1/2">
          <p className="text-center">
            Don't have an account ? Want to discover more?
          </p>
          <Button
            className={"rounded-md shadow-md hover:bg-slate-400"}
            onClick={handleClick("/sign-up")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
