import React, {useState, useEffect, useRef} from 'react';

function App() {
  const STARTING_TIME = 5

  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const textBoxRef = useRef(null)

  const startGame = () => {
    setIsTimeRunning(true)
    setTimeRemaining(STARTING_TIME)
    setText('')
    textBoxRef.current.disabled = false
    textBoxRef.current.focus()
  }

  useEffect(() => {
    if(isTimeRunning && timeRemaining > 0) {
        setTimeout(() => {
            setTimeRemaining(time => time - 1)
        }, 1000)
    } else {
        setIsTimeRunning(false)
        setWordCount(text.split(' ').filter(w => w !== '').length)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining, isTimeRunning])

  return (
      <div>
          <h1>How fast do you type?</h1>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={!isTimeRunning}
            ref={textBoxRef}
          />
          <h4>Time remaining: {timeRemaining}</h4>
          <button
            onClick={startGame}
            disabled={isTimeRunning}
          >
            Start
          </button>
          <h1>Word count: {wordCount}</h1>
      </div>
  )
}

export default App;
