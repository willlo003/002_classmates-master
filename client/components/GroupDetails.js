import React, { Component } from 'react';

class GroupDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	componentDidMount() {
		const { match: { params } } = this.props;
		fetch(`/api/group/${params.id}`)
		.then(res => res.json())
		.then(group => {
			console.log("GroupDetails: ", group)
			this.setState(() => { 
				return { ...group } 
			})
		})
	}

  render() {
		const { subject, categories, descriptions, rules, courselinks, size, sunday, monday, tuesday, wednesday, thursday, friday, saturday } = this.state;
    return (
			<>
			<div className="quitgroup"><button className="button_sec">Quit Group</button></div>
            <h1>{subject}</h1>
            <div className="detail">
                <div className="picture_section">
                    <div className="picture_card">
                        <img src="/assets/3.jpeg" className="card_img" />
                    </div>
                    <h3>Host: Catcat</h3>
                    <h5 className="onespace">{Math.floor(Math.random() * 4)} space left</h5>
                </div>
                <div className="groupdetail_section">
                    <div className="groupdetail">
                        <h3 className="detail_title">Description</h3>
                        <p>{descriptions}</p>
                    </div>
                    <div className="groupdetail">
                        <h5 className="detail_subtitle">Rules</h5>
                        <p>{rules}</p>
                    </div>
                    <div className="groupdetail">
											<h5 className="detail_subtitle">Available time</h5>
											<p>Monday {monday}</p>
											<p>Tuesday {tuesday}</p>
											<p>Wednesday {wednesday}</p>
											<p>Thursday {thursday}</p>
											<p>Friday {friday}</p>
											<p>Saturday {saturday}</p>
											<p>Sunday {sunday}</p>
                    </div>
                </div>
            </div>
			</>
    );
  }
}

export default GroupDetails;