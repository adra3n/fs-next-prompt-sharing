import '@styles/globals.css'
import { Children } from 'react'

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
        <main className="app">{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
