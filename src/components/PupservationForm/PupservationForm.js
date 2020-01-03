import React from 'react';
import './pupservationPage.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-dropdown/style.css';
import PupsApiService from '../../services/pups-api-service';
import PupServicesApiService from '../../services/pup-services-api-service';


class PupservationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    startDate: new Date(),
    pups: [], 
    services: [],
    current_pup: '',
    error: null,
    history: {
      push: () => {},
    },
    };
  }

  componentDidMount() {
    PupsApiService.getPups()
      .then( puppers => this.setState({pups: puppers}) )
  }

    // sets the date for the date picker
    handleChange = date => {
      this.setState({
        startDate: date
      });
    };

    // NEED TO MAKE SEPARATE PUPS-SERVICES-API-SERVICE......
    handleSubmit = ev =>{
      ev.preventDefault()
  
      this.setState({error: null})
  
      const {dateList, pupList, serviceList, note} = ev.target

      this.setState({current_pup: pupList.value.toString()})
  
      PupServicesApiService.postPupService({
        appt_date: dateList.value,
        service_type: serviceList.value,
        note: note.value,
        pup_id: pupList.value
      })
      .then(res => {
          note.value = ''
      })
      .catch(res => {
        throw new Error(res.error);
      })
    }
   
    render() {
      console.log(this.state.history)
        const dropPups = this.state.pups.map((pup, i) => {
          return (
            <option key={i} value={pup.id}>{pup.pup_name}</option>
          )
        });

      return (
          
          <form 
            className='pupservationForm'
            onSubmit={e => this.handleSubmit(e)}>
              <h3 className='pupservation-header'>Pick a date:</h3>
                  <div className='dateDropdown'>
                      <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      name='dateList'
                      />
                  </div>
              
              <h3 className='pupservation-header'>Who's coming?</h3>
              <select className='listOfPups' name='pupList'>
                {dropPups}
              </select>

              <h3 className='pupservation-header'>Services:</h3>
              <select className='listOfServices' name='serviceList'>
                <option value='Grooming'>Grooming</option>
                <option value='Vet'>Vet</option>
                <option value='Daycare'>Daycare</option>
              </select>

              <section className='note'>
                <label>Note</label>
                <input type='text' name='note' />
              </section>
              
              <button 
                type='submit' 
                className='pupservationConfirm-container' 
                >Submit</button>
          </form>
      );
    }
  }

export default PupservationForm;