import Glider from "react-glider"

import "glider-js/glider.min.css"
import "./Images.scss"
import { useState } from "react"
import { XIcon } from "../../../../assets/vector"
import LazyImage from "./LazyImage"
import { getImageSize } from "../../../../utils/utils"

const Images = ({ data: { stop } }) => {
  const [fullscreen, setFullscreen] = useState(false)

  return stop?.images?.photos ? (
    <div className={`details-images ${fullscreen ? "fullscreen" : "regular"}`}>
      <XIcon onClick={() => setFullscreen(s => !s)} role='button' aria-label='clear search' className='close' />
      <Glider onSlideVisible={e => console.log(e)} rewind className='slider' hasArrows>
        <div className='image-slide'>
          <LazyImage
            onClick={() => setFullscreen(s => !s)}
            placeholder={getImageSize(stop?.images?.thumbnail?.mediaDetails?.sizes, "medium")}
            src={stop?.images?.thumbnail?.mediaItemUrl}
            alt={stop?.images?.thumbnail?.altText}
          />
        </div>
        {stop?.images?.photos?.map?.(({ mediaDetails, mediaItemUrl, altText, id }) => {
          return (
            <div className='image-slide' key={id}>
              <LazyImage
                data-sizes='auto'
                placeholder={getImageSize(mediaDetails?.sizes, "medium")}
                src={mediaItemUrl}
                onClick={() => setFullscreen(s => !s)}
                alt={altText}
              />
            </div>
          )
        })}
      </Glider>
    </div>
  ) : stop?.images?.thumbnail?.mediaItemUrl ? (
    <div className={`details-images ${fullscreen ? "fullscreen" : "regular"}`}>
      <LazyImage
        onClick={() => setFullscreen(s => !s)}
        placeholder={getImageSize(stop?.images?.thumbnail?.mediaDetails?.sizes, "medium")}
        src={stop?.images?.thumbnail?.mediaItemUrl}
        alt={stop?.images?.thumbnail?.altText}
      />
    </div>
  ) : null
}

export default Images
