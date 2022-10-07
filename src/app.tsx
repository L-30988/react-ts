import React from 'react'
import 'antd/dist/antd.css'
import { Button } from 'antd'
import './app.scss'

interface IProps {
  name: string
  age: number
}

function App(props: IProps) {
  const { name, age } = props
  return (
    <div className="app">
      <Button type="primary">Primary Button</Button>
      <span>{`Hello! I'm ${name}, ${age} 梵蒂冈顶滴滴答答啊啊哦哦哦顶顶的方法.`}</span>
    </div>
  )
}

export default App
