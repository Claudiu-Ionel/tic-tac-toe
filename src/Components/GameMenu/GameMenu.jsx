import React from 'react';
import Logo from '../Logo';
import PlayerStartSwitch from './PlayerStartSwitch';
import MenuButtons from './MenuButtons';
import './_gameMenu.scss'

const GameMenu = () => {
  return (
    <div className='gameMenu-wrapper'>
      <Logo/>
      <br/>
      <PlayerStartSwitch></PlayerStartSwitch>
      <br/>
      <MenuButtons></MenuButtons>
    </div>
  )
}

export default GameMenu