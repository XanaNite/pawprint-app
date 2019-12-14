import React from 'react';
import './homePage.css';
import NavBar from '../../components/NavBar/NavBar';
import PupservationBar from '../../components/PupservationBar/PupservationBar';
import puggy from '../../assets/images/puggy.jpg';
import dogpup from '../../assets/images/dogpup.jpg';
import corgi from '../../assets/images/corgi.jpg';
import UserAvatar from 'react-user-avatar';


class HomePage extends React.Component {
    constructor(props) {
      super(props);
    }
  
  
    render() {
      return (
        <div>
            <NavBar />
            
        <section className="calendar">
            <div className = "dogCalendar">
                <span className="title">Today's Guests</span>
                <span className="dogIcon" role="img">🐶</span>
                <span className="counter">#</span>
            </div>
        </section>

        <section className="dogAvatars">
          <div className="dogList">
            <UserAvatar size="200" name="avatar" src={puggy} />
            <h1>Buster</h1>
            <UserAvatar size="200" name="avatar" src={dogpup} />
            <h1>Pickles</h1>
            <UserAvatar size="200" name="avatar" src={corgi} />
            <h1>Corgenius</h1>
        </div>
        </section>

        <section>
          <PupservationBar />
        </section>
      
        </div>
      );
    }
  }
  
  
  
export default HomePage;
