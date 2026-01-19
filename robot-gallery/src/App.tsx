import React, { useState, useEffect } from 'react'
import Robot from './components/Robot'
import RobotDiscount from './components/RobotDiscount'
import styles from './App.module.css'
import ShoppingCart from './components/ShoppingCart'

interface Props {}

const App: React.FC<Props> = (props) => {
  const [robotGallery, setRobotGallery] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const responses = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )
        // .then(response => response.json())
        // .then(data=>setRobotGallery(data))
        const data = await responses.json()
        setRobotGallery(data)
      } catch (e: any) {
        setError(e.message)
      }
      setLoading(false)
    }
    fetchData()
  }, [])
  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <h1>罗伯特机器人炫酷online购物平台</h1>
      </div>
      <ShoppingCart />
      {!error || (error !== '' && <div>网站出错：{error}</div>)}
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((r, index) =>
            index % 2 === 0 ? (
              <RobotDiscount
                id={r.id}
                email={r.email}
                name={r.name}
                key={index}
              />
            ) : (
              <Robot id={r.id} email={r.email} name={r.name} key={index} />
            )
          )}
        </div>
      ) : (
        <h2>loading加载中</h2>
      )}
    </div>
  )
}

export default App
