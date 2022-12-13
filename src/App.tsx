import React from 'react';
import { useState, useEffect } from 'react';
import logo from './assets/images/logo.svg';
import robots from './mockdata/robots.json';
import Robot from './components/Robot';
import styles from './App.module.css';
import ShoppingCart from './components/ShoppingCart'

interface Props {
  username: string
}

const App: React.FC<Props> = (props) => {
  const [count, setCount] = useState<number>(0)
  const [robotGallery, setRobotGallery] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    document.title = `点击${count}次`
  }, [count])

  useEffect(() => {
    const fetchData = async() => {
      setLoading(true)
      try {
        const responses = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await responses.json()
        setRobotGallery(data)
      } catch(e: any) {
        setError(e.message)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1>罗伯特机器人炫酷吊炸天online购物平台的名字要长</h1>
      </div>
      <h2>{props.username}</h2>
      <button
        onClick={() => {
          setCount(count+1)
        }}
      > 
        Click
      </button>
      <span>count:{count}</span>
      <ShoppingCart />
      {!error || error!=='' && <div>网站出错：{error}</div>}
      {!loading ? (<div className={styles.robotList}>
        {
          robots.map((r) => (
            <Robot id={r.id} email={r.email} name={r.name} />
          ))
        }
      </div>) : (
        <h2>loading加载中</h2>
      )}
    </div>
  )
}

export default App;
