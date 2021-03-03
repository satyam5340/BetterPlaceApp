import React from "react";
import Card from "./Card";
import "./List.css";
// images
import fill from "../Assets/filter.svg";
import search from "../Assets/search.svg";
import next from "../Assets/right-arrow.svg";
import prev from "../Assets/left-arrow.svg";
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      gender: [],
      countries: [],
      number: 10,
      filters: false,
      currIndex: 0,
      exhausted: false,
    };
  }
  toggleFilterHandler = () => {
    this.setState({
      filters: !this.state.filters,
    });
  };
  resolvePromise = () => {
    console.log("done");
  };
  rejectPromise = (err) => {
    console.log(err);
  };
  searchHandler = () => {
    let countries = [...this.state.countries];
    let gender = [...this.state.gender];
    let number = this.state.number;
    if (gender.length === 0) {
      gender = ["male", "female"];
    }
    if (countries.length === 0) {
      countries = ["AU", "BR", "CA", "FR", "GB", "US"];
    }

    let results = [];

    let allPromise = [];

    for (let i = 0; i < countries.length; i++) {
      for (let j = 0; j < gender.length; j++) {
        let currURL = `http://localhost:7000/api?gender=${gender[j]}&nat=${countries[i]}`;
        console.log(currURL);
        allPromise.push(
          new Promise(function (reject, resolve) {
            fetch(currURL)
              .then((res) => res.json())
              .then((res) => {
                results = results.concat(res.data);
              })
              .then(() => {
                resolve("done");
              })
              .catch((err) => {
                reject(err);
              });
          }).then(this.resolvePromise, this.rejectPromise)
        );
      }
    }
    Promise.all(allPromise).then(() => {
      this.setState({
        people: results,
      });
    });
  };
  handleInputChange = (e) => {
    if (e.target.name === "gender") {
      let newG = [...this.state.gender];
      const index = newG.indexOf(e.target.value);
      if (index > -1) {
        newG.splice(index, 1);
      } else {
        newG.push(e.target.value);
      }
      this.setState({
        gender: newG,
      });
    } else if (e.target.name === "country") {
      let newG = [...this.state.countries];
      const index = newG.indexOf(e.target.value);
      if (index > -1) {
        newG.splice(index, 1);
      } else {
        newG.push(e.target.value);
      }
      this.setState({
        countries: newG,
      });
    } else if (e.target.name === "number") {
      console.log(e.target.value);
      this.setState({
        number: parseInt(e.target.value),
      });
    }
  };
  pageRollHandlerFWD = () => {
    if (this.state.currIndex + this.state.number < this.state.people.length) {
      this.setState({
        currIndex: this.state.currIndex + this.state.number,
      });
    }
  };
  pageRollHandlerBAK = () => {
    console.log("entered");
    if (this.state.currIndex - this.state.number >= 0) {
      this.setState({
        currIndex: this.state.currIndex - this.state.number,
      });
    }
  };
  render() {
    console.log(this.state.people);
    let ele = [];
    if (this.state.people.length > 0) {
      for (
        let i = this.state.currIndex;
        i < this.state.currIndex + this.state.number &&
        i < this.state.people.length;
        i++
      ) {
        ele.push(
          <Card
            key={i}
            nationality={this.state.people[i].country}
            name={this.state.people[i].name}
            gender={this.state.people[i].gender}
            thumbnail={this.state.people[i].thumbnail}
            email={this.state.people[i].email}
            phone={this.state.people[i].phone}
            large={this.state.people[i].bigger}
          />
        );
      }
    }

    return (
      <div>
        <div onClick={this.toggleFilterHandler} className="Filter">
          <h2>Click To Filter</h2>
          <img src={fill} alt="img" />
        </div>
        <div className="search-box">
          {this.state.filters ? (
            <form>
              <div className="in-filter">
                <div className="in-inner">
                  <p>Gender</p>
                </div>
                <input
                  name="gender"
                  type="checkbox"
                  value="male"
                  onChange={this.handleInputChange}
                />
                Male
                <input
                  name="gender"
                  type="checkbox"
                  value="female"
                  onChange={this.handleInputChange}
                />
                Female
              </div>
              <div className="in-filter">
                <div className="in-inner">
                  <p>Nationality</p>
                </div>
                <input
                  name="country"
                  type="checkbox"
                  value="AU"
                  onChange={this.handleInputChange}
                />
                Australia
                <input
                  name="country"
                  type="checkbox"
                  value="BR"
                  onChange={this.handleInputChange}
                />
                Brazil
                <input
                  name="country"
                  type="checkbox"
                  value="CA"
                  onChange={this.handleInputChange}
                />
                Canada
                <input
                  name="country"
                  type="checkbox"
                  value="FR"
                  onChange={this.handleInputChange}
                />
                France
                <input
                  name="country"
                  type="checkbox"
                  value="GB"
                  onChange={this.handleInputChange}
                />
                Great Britain
                <input
                  name="country"
                  type="checkbox"
                  value="US"
                  onChange={this.handleInputChange}
                />
                USA
              </div>
              <div className="in-filter">
                <div className="in-inner">
                  <p>records/page</p>
                </div>
                <input
                  name="number"
                  type="radio"
                  value={10}
                  onChange={this.handleInputChange}
                />
                10
                <input
                  name="number"
                  type="radio"
                  value={20}
                  onChange={this.handleInputChange}
                />
                20
                <input
                  name="number"
                  type="radio"
                  value={50}
                  onChange={this.handleInputChange}
                />
                50
                <input
                  name="number"
                  type="radio"
                  value={100}
                  onChange={this.handleInputChange}
                />
                100
              </div>
            </form>
          ) : null}
          <div onClick={this.searchHandler} className="heading">
            <h2>Click To Search</h2>
            <img src={search} alt="img" />
          </div>
        </div>
        <div className="scroll-button ">
          <div className="align-item">
          <div onClick={this.pageRollHandlerBAK} className="prev">
              <img src={prev} alt="next" />
            </div>
            <div onClick={this.pageRollHandlerFWD} className="next">
              <img src={next} alt="prev" />
            </div>
            
          </div>
        </div>
        {/* <select onChange={() => this.selectHandler('gender')} >
                    <option value='male'>
                        <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                        <label>Male</label>
                    </option>
                    <option value='female'><input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} /><label>female</label></option>
                </select>
                <select onChange={() => this.selectHandler('nationality')} >
                    <option value='AU'>Australia</option>
                    <option value='BR'>Brazil</option>
                    <option value='CA'>Canada</option>
                    <option value='FR'>France</option>
                    <option value='GB'>Great Britain</option>
                    <option value='US'>USA</option>
                </select>
                <select onChange={() => this.selectHandler('number')} >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select> */}

        {ele}
        
      </div>
    );
  }
}
export default List;
