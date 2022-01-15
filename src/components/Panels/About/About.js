import { useContext } from "react"
import { DetailsContext } from "../../../context"
import "./About.scss"

const About = () => {
  const { closePanel } = useContext(DetailsContext)
  return (
    <div className='about'>
      <h3>About</h3>
      <h4>What is this?</h4>
      <p>
        This site is a way for friends, family, and anybody who's interested to keep up with our adventures as we travel
        the world.
      </p>
      <h5>Special Thanks:</h5>
      <ul>
        <li>
          <a target='_blank' rel='noreferrer' href='https://pigeon-maps.js.org/'>
            Pigeon Maps
          </a>
        </li>
        <li>
          <a target='_blank' rel='noreferrer' href='https://www.openstreetmap.org/'>
            OpenStreetMaps
          </a>
        </li>
      </ul>
    </div>
  )
}

export default About
