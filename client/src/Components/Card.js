import React from 'react'
import './Card.css'
import Big from './Big'

class Card extends React.Component{
    constructor(props){
        super(props)
        this.state={
            big:false
        }
    }
    toggleBig = () => {
        this.setState({
            big:!this.state.big
        })
    }
    render(){
      return (
        <div className="card-container">
          <div className="image-container">
            <div className="thumb">
              <img src={this.props.thumbnail} onClick={this.toggleBig}/>
            </div>
    
            <div className="name-gender">
              <p>{this.props.name}</p>
              <p>{this.props.gender}</p>
            </div>
          </div>
    
          <div className="national">{this.props.nationality}</div>
          <div className="combine">
            <p>{this.props.email}</p>
            <p>{this.props.phone}</p>
          </div>
          {this.state.big ? <Big image={this.props.large} remove={this.toggleBig}/> : null}
        </div>
      );
    }
  
};
export default Card;
