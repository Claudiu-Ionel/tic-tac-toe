import React, { useContext } from 'react'
import { AppContext } from '../../context/Context';
import { ReactComponent as Xshape } from '../../assets/X-shape.svg';
import { ReactComponent as Oshape } from '../../assets/Oval-shape.svg';

const PlayerStartSwitch = () => {
  const {playerStart, setPlayerStart} = useContext(AppContext)
  return (
    <div className='player-start-switch-wrapper'>
      <h6 className='title'>Pick player 1's mark</h6>
      <fieldset>
        
       <div className='radio-wrapper'>
       <input 
        type="radio" 
        id="radio-X" 
        name="X" 
        value="X" 
        checked={playerStart === "X"} 
        onChange={(e) => setPlayerStart(e.target.value)}
        /> 
        <label id="label-X" htmlFor="radio-X">
        {<Xshape style={{ 
          cursor: "pointer",
          width: 25, 
          height: 25, 
          fill: playerStart === "X" ? '#1F3641' : "#A8BFC9"
         }} />}
        </label>
       </div>
       <div className='radio-wrapper'>
       <input 
        type="radio" 
        id="radio-0" 
        name="O" 
        value="O" 
        checked={playerStart === "O"}
        onChange={(e) => setPlayerStart(e.target.value)}
        />
        <label id="label-0" htmlFor="radio-0">
        { <Oshape style={{ 
          cursor: "pointer",
          width: 25, 
          height: 25, 
          fill: playerStart === "O" ? '#1F3641' : "#A8BFC9"
         }} />}
        </label>
       </div>
      </fieldset>
      <p className='footer'>remember: x goes first</p>
    </div>
  )
}

export default PlayerStartSwitch