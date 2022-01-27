import { useContext, useEffect, useCallback } from "react"
import Lottie from "react-lottie-player"

import { DetailsContext, MapContext } from "../../context"
import { prettyCoords } from "../../utils/utils"
import { Description, Images } from "./DetailComponents"

import { loadingLottieData } from "../../assets/lottie"
import "./Details.scss"
import { useParams } from "react-router-dom"

const DetailsContent = () => {
  const { stopId } = useParams(),
    {
      stopDetails: { data, loading: stopDataLoading, error },
      getStopDetails,
    } = useContext(DetailsContext),
    {
      getStop,
      stops: { data: stopsData, loading: stopsLoading },
    } = useContext(MapContext)

  const fetchStop = useCallback(
    () => ((stopsData?.length === 1 && stopsData?.[0]?.id === stopId) || stopsLoading ? null : getStop(stopId)),
    [getStop, stopId, stopsData, stopsLoading]
  )

  useEffect(() => getStopDetails(stopId), [getStopDetails, stopId])
  useEffect(() => fetchStop(), [fetchStop])

  return (
    <>
      {stopDataLoading ? (
        <div className='details-loading'>
          <Lottie
            role='img'
            aria-label='loading animation'
            animationData={loadingLottieData}
            play
            className='loading-lottie'
          />
        </div>
      ) : data ? (
        <>
          <div className='details-title'>
            <h2>{data?.title?.split(",")[0]}</h2>
            <div className='address-coords-wrapper'>
              <p className='coordinates'>{prettyCoords(data)}</p>
              <p className='address'>{data?.location?.address || data?.title}</p>
            </div>
          </div>
          <Images data={{ stop: data, loading: stopDataLoading, error }} />
          <Description data={{ stop: data, loading: stopDataLoading, error }} />
        </>
      ) : null}
    </>
  )
}

export default DetailsContent
