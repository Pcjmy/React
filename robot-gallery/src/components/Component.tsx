import React from 'react'
import { useState } from 'react'

type CT = 'A' | 'B' | 'C'

const ComA = () => <h1>A</h1>
const ComB = () => <h1>B</h1>
const ComC = () => <h1>C</h1>

const COMP_MAP: Record<CT, (props: any) => JSX.Element> = {
  A: (props) => <h1>A</h1>,
  B: (props) => <h1>B</h1>,
  C: (props) => <h1>C</h1>
}

export default function Component() {
  const [type, setType] = useState<CT>('A')

  const handleToggle = (ct: CT) => setType(ct)

  return (
    <div>
      <select value={type} onChange={(e) => handleToggle(e.target.value as CT)}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>

      <div>{COMP_MAP[type]({})}</div>
    </div>
  )
}
