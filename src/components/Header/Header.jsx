import React from 'react'
import logo from '../../assets/logo.png'
import './Header.css'

function Header() {
  return (
    <header className='header'>
      <h2 className='header-text'>abilisense audio test</h2>
      <img src={logo} alt='logo' className='logo' />
    </header>
  )
}

export default Header
