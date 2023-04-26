import React from 'react'
import { ReactComponent as Xshape } from '../assets/X-shape.svg';
import { ReactComponent as Oshape } from '../assets/Oval-shape.svg';
const Logo = () => {
  return (
    <div className="logo">
          <Xshape style={{ marginRight: 10, fill: '#31C3BD', width: 30, height: 30 }} />
          <Oshape style={{ fill: '#F2B137', width: 30, height: 30 }} />
    </div>
  )
}

export default Logo