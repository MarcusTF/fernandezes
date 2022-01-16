import "./Description.scss"

const Description = ({ data: { stop, loading, error } }) => {
  return stop?.text?.description ? (
    <div className='details-description'>
      {stop?.text?.title ? <h3 className='subtitle'>{stop?.text?.title}</h3> : null}
      <p className='description'>{stop?.text?.description}</p>
    </div>
  ) : null
}

export default Description
