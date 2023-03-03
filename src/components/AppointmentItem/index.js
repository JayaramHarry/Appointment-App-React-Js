// Write your code here

import './index.css'

const STAR =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
const FILLED_STAR =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

const AppointmentItem = props => {
  const {onAddAppointment, isToggleFavorite} = props
  const {id, title, date, isStarred} = onAddAppointment
  const starActive = isStarred ? FILLED_STAR : STAR

  const isFavorite = () => {
    isToggleFavorite(id)
  }

  return (
    <li className="list-item">
      <div className="star-container">
        <p className="appointment-name">{title}</p>
        <button onClick={isFavorite} data-testid="star" type="button">
          <img className="star-img" src={starActive} alt="star" />
        </button>
      </div>
      <p className="date-time">{date}</p>
    </li>
  )
}
export default AppointmentItem
