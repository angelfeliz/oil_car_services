import React, { Component } from 'react';
import AutoCompleteDropBox from './AutoCompleteDropBox';


class HeadAutoComplete extends Component {
  constructor(props){
    super(props);
     this.state = {
      dropBoxOpen: false,
    }
  }
  onClickShowDropBox = () => {
    this.setState({...this.state, dropBoxOpen: !this.state.dropBoxOpen})
  }

  onClickElementList = (id) => {
      this.setState({...this.state, dropBoxOpen: !this.state.dropBoxOpen})
    this.props.onClickElementList(id);
  }
  render() {

    return (
      <div>
        <span className="input-group">
          <span onClick={this.onClickShowDropBox} className="form-control spanLookInput">{this.props.select_item}</span>
          <span onClick={this.onClickShowDropBox} className="input-group-addon">
          <i className="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </span>

      <span className={this.state.dropBoxOpen == true
      ? "drop-open"
      : "form-control drop-close"}>
      <input className="form-control" type="text" onChange={(e) => this.props.onChangeFind(e)}/>
      </span>

      <span className={this.state.dropBoxOpen == true
      ? "drop-open"
      : "form-control drop-close"}>
      <AutoCompleteDropBox list={this.props.list} onClick={this.onClickElementList}/>
      </span>
      </div>
    )
  }
}

export default HeadAutoComplete
