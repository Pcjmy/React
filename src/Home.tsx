import React from 'react'
import { createPortal } from 'react-dom'

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div style={{ border: '2px solid black' }}>
      <p>This child is placed in the parent div.</p>
      {createPortal(
        <p>This child is placed in the document body.</p>,
        document.body
      )}
    </div>
  )
}

export default Home
