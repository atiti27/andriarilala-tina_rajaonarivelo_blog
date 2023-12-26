import "@/styles/globals.css"
import Header from "@/web/components/Header"

const App = ({ Component, pageProps }) => (
  <div className="flex flex-col">
    <Header />
    <section className="p-4">
      <div className="md:max-w-3xl p-4 mx-auto">
        <Component {...pageProps} />
      </div>
    </section>
  </div>
)

export default App
