"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../helpers/Context'
import { getPreferredTheme, setStoredTheme, setTheme } from '../helpers/Theme'
import UsuarioInfo from './UsuarioInfo';

export default function TopMenu() {

  //Contexto
  const {data} = useAppContext()
  //Control de los componentes flotantes
  const [Show, setShow] = useState(false)
  const [ShowE, setShowE] = useState(false)
  const element1 = useRef(null)
  const element2 = useRef(null)


  //const navigate = useNavigate()

  const onShow = () => {
    setShow(!Show)
  }
  const onShowE = () => {
    setShowE(!ShowE)
  }


  useEffect(() => {
    setTheme(getPreferredTheme())

    const handleClickOutside = (event) => {
      let a = element1.current
      let b = element2.current
      if (a && !a.contains(event.target)) setShowE(false)
      if (b && !b.contains(event.target)) setShow(false)
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectTheme = theme => {
    setTheme(theme)
    setStoredTheme(theme)
    onShow()
  }


  return (
    <div className='navbar navbar-collapse d-flex justify-content-between m-3 p-0 bg-body  rounded-pill position-relative sticky-top' >
      {/* Este div solo es de espaciado */}
      <div className='col-md-1 col-xl-2'></div>

      <div className='col d-flex justify-content-end align-items-center'>

        <div className=''>
          <div className='p-3' onClick={onShowE}>
            <i className="bi bi-person-circle"></i>
          </div>

          {ShowE && <UsuarioInfo/> }
        </div>

        <div className=''>
          <div className='p-3' onClick={onShow}>
            <i className="bi bi-brightness-high-fill"></i>
          </div>

          {Show &&
            <div className='z-3 p-3 shadow rounded-4 position-absolute top-100 end-0 bg-body' ref={element2}>

              <div className='py-1' onClick={() => selectTheme('light')}>
                <i className="bi bi-brightness-high-fill"></i> Claro
              </div>
              <div className='py-1' onClick={() => selectTheme('dark')}>
                <i className="bi bi-moon-stars-fill" ></i> Oscuro
              </div>
            </div>
          }
        </div>



      </div>


    </div>
  )
}
