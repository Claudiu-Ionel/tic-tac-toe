import React, { useContext } from 'react'
 import { AppContext } from '../../context/Context';

const MenuButtons = () => {
  const {setGameStart, enableCpuMode} = useContext(AppContext)
  return (
    <div className='gameMenuButtons-wrapper'>
      <button onClick={() => enableCpuMode()} className='new-game-cpu'>new game (vs cpu)</button>
      <button onClick={() => setGameStart(true)} className='new-game-player'>new game (vs player)</button>

    </div>
  )
}

export default MenuButtons;