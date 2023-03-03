// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isFilterActive: false,
  }

  isToggleFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state
    const formatDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formatDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTextInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onDateSelectInput = event => {
    this.setState({dateInput: event.target.value})
  }

  isFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(each => each.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filled-star' : 'empty-star'
    const filteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="appointment-container">
        <div className="add-appointment-container">
          <div className="input-container">
            <form className="from" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label className="label" htmlFor="text-input">
                TITLE
              </label>
              <input
                placeholder="Title"
                className="input"
                type="text"
                id="text-input"
                value={titleInput}
                onChange={this.onChangeTextInput}
              />
              <label className="label" htmlFor="date-input">
                DATE
              </label>
              <input
                value={dateInput}
                className="input"
                type="date"
                id="date-input"
                onChange={this.onDateSelectInput}
              />
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="hr" />
          <div className="appointment-starred-container">
            <h1 className="appointments">Appointments</h1>
            <button
              onClick={this.isFilter}
              className={`filter-button ${filterClassName}`}
              type="button"
            >
              Starred
            </button>
          </div>
          <ul className="list-items">
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                isToggleFavorite={this.isToggleFavorite}
                onAddAppointment={eachAppointment}
                key={eachAppointment.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
