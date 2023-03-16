import React, { useContext } from 'react';
import { ReactComponent as Xshape } from '../assets/X-shape.svg';
import { ReactComponent as Oshape } from '../assets/Oval-shape.svg';
import { AppContext } from '../context/Context';
const Modal = ({ message }) => {
  const { resetGame, setModalMessage } = useContext(AppContext);
  const open = message ? true : false;
  // X has won
  if (message === 'X')
    return (
      <div className="modal" open={open}>
        <section className="modal-content grid-3-rows">
          <div className="game-result-title">text</div>
          <div className="game-result-win">
            <Xshape style={{ fill: '#31C3BD', width: 64, height: 64 }} />
            <h1 style={{ color: '#31C3BD', textTransform: 'uppercase' }}>Takes the round</h1>
          </div>
          <div className="game-result-buttons">
            <button className="quit-button" type="button">
              quit
            </button>
            <button onClick={() => resetGame()} className="next-round-button" type="button">
              next round
            </button>
          </div>
        </section>
      </div>
    );
  // O has won
  if (message === 'O')
    return (
      <div className="modal" open={open}>
        <div className="modal-content">
          <section className="modal-content grid-3-rows">
            <div className="game-result-title">text</div>
            <div className="game-result-win">
              <Oshape style={{ fill: '#F2B137', width: 64, height: 64 }} />
              <h1 style={{ color: '#F2B137', textTransform: 'uppercase' }}>Takes the round</h1>
            </div>
            <div className="game-result-buttons">
              <button className="quit-button" type="button">
                quit
              </button>
              <button onClick={() => resetGame()} className="next-round-button" type="button">
                next round
              </button>
            </div>
          </section>
        </div>
      </div>
    );

  //Tie
  if (message === 'tie')
    return (
      <div className="modal" open={open}>
        <div className="modal-content">
          <section className="modal-content grid-2-rows">
            {/* <div className="game-result-title"></div> */}
            <div className="game-result-win">
              <h1 style={{ color: '#A8BFC9', textTransform: 'uppercase' }}>Round Tied</h1>
            </div>
            <div className="game-result-buttons">
              <button className="quit-button" type="button">
                quit
              </button>
              <button onClick={() => resetGame()} className="next-round-button" type="button">
                next round
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  if (message === 'restart')
    return (
      <div className="modal" open={open}>
        <div className="modal-content">
          <section className="modal-content grid-2-rows">
            {/* <div className="game-result-title"></div> */}
            <div className="game-result-win">
              <h1 style={{ color: '#A8BFC9', textTransform: 'uppercase' }}>Restart Game?</h1>
            </div>
            <div className="game-result-buttons">
              <button onClick={() => setModalMessage('')} className="quit-button" type="button">
                No, Cancel
              </button>
              <button onClick={() => resetGame()} className="next-round-button" type="button">
                Yes, restart
              </button>
            </div>
          </section>
        </div>
      </div>
    );
};

export default Modal;
