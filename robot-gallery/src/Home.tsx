import React from 'react'
import { useState } from 'react'

const Home: React.FC = () => {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={handleClick}>add {count}</button>
    </div>
  )
}

export default Home
