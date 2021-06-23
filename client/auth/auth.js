class Auth {
	constructor() {
		this.authenticated = false
	}
	login(callback) {
		this.authenticated = true
		console.log("hit this?")
		callback()
	}
	logout(callback) {
		this.authenticated = false
		callback()
	}
	isAuthenticated() {
		return this.authenticated;
	}
}

export default new Auth();