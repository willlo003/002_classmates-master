import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';


class Group extends Component {
	constructor(props) {
		super(props);
	}

  render() {
		const { _id, id, subject, courselinks, size } = this.props
    return (
      <div className="group_section_card">
			<BrowserRouter>

				<div className="card_img_section">
						<Link to={`/group/${_id}`}><img src={`https://picsum.photos/id/${_id || id }/300/200`} className="card_img" /></Link>
						<div className="overlay">
						</div>
				</div>
				 <div className="card_content">
						<h4>{subject}</h4>
						<h5 className="onespace">Size of classroom: {size}</h5>
						<h5 className="courselink"><a href={courselinks}>Check Udemy course &rarr;</a></h5>
				 </div>
			</BrowserRouter>
      </div>
    );
  }
}

export default Group;