import { useContext } from "react"
import { DetailsContext } from "../../../context"
import "./About.scss"

const About = () => {
  const { closePanel } = useContext(DetailsContext)
  return (
    <info>
      <p>HELLO WORLD</p>
      <button onClick={() => closePanel()}>X</button>
    </info>
  )
}

export default About
