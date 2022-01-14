import { useContext } from "react"
import Lottie from "react-lottie-player"

import { DetailsContext } from "../../context"
import { prettyCoords } from "../../utils/utils"

import loadingJSON from "../../assets/lottie/loading.json"
import "./Details.scss"

const Details = () => {
  const {
    stop: { data: stop, loading, error },
  } = useContext(DetailsContext)

  return stop || loading ? (
    <div className='details'>
      {loading ? (
        <div className='details-loading'>
          <Lottie animationData={loadingJSON} play className='loading-lottie' />
        </div>
      ) : (
        <>
          <div className='details-title'>
            <h2>{stop?.title?.split(",")[0]}</h2>
            <div className='address-coords-wrapper'>
              <p className='coordinates'>{prettyCoords(stop)}</p>
              <p className='address'>{stop?.location?.address || stop?.title}</p>
            </div>
          </div>
          {stop?.images?.thumbnail?.mediaItemUrl ? (
            <div className='details-image'>
              <img src={stop?.images?.thumbnail?.mediaItemUrl} alt='featured' />
            </div>
          ) : null}
        </>
      )}
    </div>
  ) : null
}

export default Details
