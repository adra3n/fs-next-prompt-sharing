import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  title: 'Prompt Share',
  description: 'Discover new prompts or share your favorite AI prompts',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          <Provider />
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
