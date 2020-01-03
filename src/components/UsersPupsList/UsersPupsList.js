import React from 'react'
import './UsersPupsList.css'
import UsersPup from '../UsersPup/UsersPup'

export default class UsersPupsList extends React.Component {
  render() {
    return (
      <>
        <ul>
          {this.props.pups.map((pup, i) => { 
            if (pup.parent_id == localStorage.getItem('user_id')){
              return <UsersPup {...pup} key={i} />
            }
          })
          }
        </ul>
      </>
    )
  }
}

UsersPupsList.defaultProps = {
  pups: [],
}