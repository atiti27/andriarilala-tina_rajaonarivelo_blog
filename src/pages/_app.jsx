import "@/styles/globals.css"
import Header from "@/web/components/Header"
import { SessionProvider } from "@/web/components/SessionContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const client = new QueryClient()
const App = ({ Component, pageProps }) => (
  <QueryClientProvider client={client}>
    <SessionProvider>
      <div className="flex flex-col relative bg-cover bg-center h-screen bg-bg-blog">
        <Header />
        <section className="p-2 mt-16">
          <div className="md:max-w-3xl p-4 mx-auto">
            <Component {...pageProps} />
          </div>
        </section>
      </div>
    </SessionProvider>
  </QueryClientProvider>
)

export default App
