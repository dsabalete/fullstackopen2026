import { useContext } from 'react'
import CounterContext from '../CounterContext.jsx'

const Display = () => {
  const { counter } = useContext(CounterContext)

  return <div>{counter}</div>
}

export default Display
