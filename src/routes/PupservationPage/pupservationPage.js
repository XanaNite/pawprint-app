import React from 'react';
import './pupservationPage.css';
import NavBar from '../../components/NavBar/NavBar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import PupservationConfirm from '../../components/PupservationConfirm/PupservationConfirm';
import config from '../../config';
import { render } from 'react-dom';
import PupsApiService from '../../services/pups-api-service';

    /* a;skdfj;alksjdf;kaj;dfj;aksjdflkja; */

class PupservationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    startDate: new Date(),
    pups: [], 
    services: [],
    error: null
  };
}

    // sets the date for the date picker
    handleChange = date => {
      this.setState({
        startDate: date
      });
    };

    // NEED TO MAKE SEPARATE PUPS-SERVICES-API-SERVICE......
    // handleSubmit = ev =>{
    //   ev.preventDefault()
  
    //   this.setState({error: null})
  
    //   const {dateList, pupList, serviceList} = ev.target
  
    //   PupsApiService.postLogin({
    //     appt_date: email.value,
    //     password: password.value,
    //   })
    //   .then(res => {
    //     if(typeof res.authToken !== 'undefined') {
    //       localStorage.setItem('user_id', res.id)
    //       email.value = ''
    //       password.value = ''
    //       TokenService.saveAuthToken(res.authToken)
    //       this.props.onLoginSuccess()
    //     }
    //     else {
    //       this.setState({error: res.error})
    //     }
    //   })
    //   .catch(res => {
    //     throw new Error(res.error);
    //   })
    // }


  componentDidMount() {
    
    PupsApiService.getPups()
      .then( puppers => this.setState({pups: puppers}) )
  }

   
    render() {
        console.log(this.state.pups);

        const options2 = [ 
          // services are always the same options
            'Grooming', 'Vet', 'Daycare'
        ];
        const defaultOption2 = options2[0];

        const dropPups = this.state.pups.map((pup, i) => {
          return (
            <option key={i} value={pup.id}>{pup.pup_name}</option>
          )
        });

      return (
          
        <div>
        <NavBar />
        <div className="pupservationContainer">
        <h2 className='pupservation-heading'>Make a Pupservation</h2>
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
              
              <PupservationConfirm />
          </form>
        </div>
        </div>
      );
    }
  }

export default PupservationPage;
