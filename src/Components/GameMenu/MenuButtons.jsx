import React, { useContext } from 'react'
 import { AppContext } from '../../context/Context';

const MenuButtons = () => {
  const {setGameView, enableCpuMode, vsPlayerMode, setVsPlayerMode} = useContext(AppContext)
  return (
    <div className='gameMenuButtons-wrapper'>
      <button onClick={() => enableCpuMode()} className='new-game-cpu'>new game (vs cpu)</button>
      <button onClick={() => {
        setGameView(true)
        setVsPlayerMode(true)
      }} className='new-game-player'>new game (vs player)</button>

    </div>
  )
}

export default MenuButtons;