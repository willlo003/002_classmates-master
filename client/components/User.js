import React, { Component } from 'react';

class User extends Component {
	constructor(props) {
		super(props);
		this.state = { name: ""}
	}
	componentDidMount() {
		fetch('/api/user')
		.then(res => res.json())
		.then(data =>{
			this.setState({name : data[0].name})
		}).catch(err => console.log(err))
	}

  render() {
    return (
      <div>
				giggity
       {this.state.name}
      </div>
    );
  }
}

export default User;