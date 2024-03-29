import React, { useContext } from 'react';
import { ReactComponent as Xshape } from '../assets/X-shape.svg';
import { ReactComponent as Oshape } from '../assets/Oval-shape.svg';
import { AppContext } from '../context/Context';


type ModalProps = {
  message: "X" | "O" | "tie" | "restart" | ""
}
const Modal = ({ message } :ModalProps) => {
  const { resetGame, setModalMessage } = useContext(AppContext);
  const open = message ? true : false;
  // X has won
  if (message === 'X')
    return (
      <dialog className="modal" open={open}>
        <section className="modal-content grid-3-rows">
          <div className="game-result-title">text</div>
          <div className="game-result-win">
            <Xshape style={{ fill: '#31C3BD', maxWidth: 60, maxHeight: 60 }} />
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
      </dialog>
    );
  // O has won
  if (message === 'O')
    return (
      <dialog className="modal" open={open}>
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
      </dialog>
    );

  //Tie
  if (message === 'tie')
    return (
      <dialog className="modal" open={open}>
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
      </dialog>
    );
  if (message === 'restart')
    return (
      <dialog className="modal" open={open}>
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
      </dialog>
    );
    return <div></div>
};

export default Modal;
