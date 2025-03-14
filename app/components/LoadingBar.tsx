import { useState, useEffect } from 'react'

export default function LoadingBar ({ style = {} }) {
  const [progress, setProgress] = useState(1)

  useEffect(() => {
	const timeout1 = setTimeout(() => setProgress(25), 2500)
	const timeout2 = setTimeout(() => setProgress(50), 5000)
	const timeout3 = setTimeout(() => setProgress(75), 7500)
	const timeout4 = setTimeout(() => setProgress(95), 10000)
	const timeout5 = setTimeout(() => setProgress(100), 15000)

	return () => {
	  clearTimeout(timeout1)
	  clearTimeout(timeout2)
	  clearTimeout(timeout3)
	  clearTimeout(timeout4)
	  clearTimeout(timeout5)
	}
  }, [])

  const backgroundColor = progress >= 25 ? '#8AEA92' : 
  progress >= 50 ? '#29BF12' : 
  progress >= 75 ? '#00A676' : 
  '#386641'

  return (
	<div className='loading-bar' style={style}>
	  <div className='progress-wrapper'>
		<div className='progress' style={{width: `${progress}%`, backgroundColor}} />
	  </div>
	</div>
  )
}
