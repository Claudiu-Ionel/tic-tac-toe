import { useContext } from 'react'
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
        name="0" 
        value="0" 
        checked={playerStart === "0"}
        onChange={(e) => setPlayerStart(e.target.value)}
        />
        <label id="label-0" htmlFor="radio-0">
        { <Oshape style={{ 
          cursor: "pointer",
          width: 25, 
          height: 25, 
          fill: playerStart === "0" ? '#1F3641' : "#A8BFC9"
         }} />}
        </label>
       </div>
      </fieldset>
      <h6 className='footer'>remember: x goes first</h6>
    </div>
  )
}

export default PlayerStartSwitch