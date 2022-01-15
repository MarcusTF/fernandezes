import Glider from "react-glider"

import "glider-js/glider.min.css"
import "./Images.scss"
import { useState } from "react"
import { XIcon } from "../../../../assets/vector"

const Images = ({ data: { stop } }) => {
  const [fullscreen, setFullscreen] = useState(false)

  return stop?.images?.thumbnail?.mediaItemUrl ? (
    <div className={`details-images ${fullscreen ? "fullscreen" : "regular"}`}>
      <XIcon onClick={() => setFullscreen(s => !s)} role='button' aria-label='clear search' className='close' />
      <Glider draggable rewind className='slider' hasArrows>
        <div className='image-slide'>
          <img
            onClick={() => setFullscreen(s => !s)}
            src={stop?.images?.thumbnail?.mediaItemUrl}
            alt={stop?.images?.thumbnail?.altText}
          />
        </div>
        {stop?.images?.photos?.map?.(({ mediaItemUrl, altText, id }, i) => (
          <div className='image-slide' key={id}>
            <img onClick={() => setFullscreen(s => !s)} src={mediaItemUrl} alt={altText} />
          </div>
        ))}
      </Glider>
    </div>
  ) : null
}

export default Images
