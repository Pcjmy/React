import React from 'react'
import styles from './Home.module.css'

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div className={styles.App}>
      <header className={styles['App-Header']}>
        <button>导入JSON</button>
        <button>预览</button>
        <button>撤销</button>
        <button>重做</button>
        <button>清空</button>
      </header>
      <div className={styles.content}>
        <div className={styles['nav-layout']}>组件库</div>
        <div className={styles['main-layout']}></div>
        <div className={styles['aside-layout']}>
          <div className={styles['item']}>属性</div>
        </div>
      </div>
    </div>
  )
}

export default Home
