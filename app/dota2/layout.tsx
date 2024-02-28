export default function RootLayout({ 
  children 
}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='antialiased' suppressHydrationWarning>
      <body>
        <div className='app'>
          {children}
        </div>
      </body>
    </html>
  )
}
