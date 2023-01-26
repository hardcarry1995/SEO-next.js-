import React, { useState, useEffect } from 'react'
import Login from './Login'
import Quiz from './Quiz'

import { Grid } from '@mui/material'

export default function Home() {

  const [name, setName] = useState('')
  const [info, setInfo] = useState(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('quiz')) : null)
  const [index, setIndex] = useState(0)
  const [pageType, setPageType] = useState(0)

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('quiz')) !== null) {
      setIndex(JSON.parse(localStorage.getItem('quiz')).status)
      setPageType(1)
    }
  }, [])

  useEffect(() => {
    if (name)
      setInfo(JSON.parse(localStorage.getItem('quiz')))
  }, [name])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInfo(JSON.parse(localStorage.getItem('quiz')))
    }
  }, [index])

  const handleLogin = (name) => {
    localStorage.setItem('quiz', JSON.stringify({ 'name': name, status: 0 }))
    setName(name)
    setPageType(1)
  }

  return (
    <Grid container justifyContent="center" sx={{ display: 'grid' }} spacing={2} mt={10}>
      <Login
        visible={pageType === 0}
        onSubmit={handleLogin}
      />
      <Quiz visible={pageType === 1} name={name} index={index} info={info} setPageType={setPageType} setIndex={setIndex} setInfo={setInfo} setName={setName} />
    </Grid>
  )
}
