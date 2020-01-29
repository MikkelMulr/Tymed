import React, { Component } from 'react';
import firebase from '../../firebase/firebase.utils';
import './Login.styles.scss';

export class Login extends Component {
	state = {
		email: '',
		password: '', //encrypt prior to state change
		password2: '',
		first_name: '',
		last_name: '',
		usersData: [],
		errorMsg: 'Invalid Password',
		showError: 'hidden',
		setView: 'login',
	};

	componentDidMount() {
		this.getCurrentDBstate();
	}


	getCurrentDBstate = () => {
		console.log(this.props);

		this.unsubscribe = firebase.firestore().collection('users').get().then((snapshot) => {
			if (snapshot.empty) {
				console.log('no users found');
			} else {
				this.setState({ usersData: snapshot.docs });
			}
		});
	}

	getFormData = (e) => {
		if (e.target.name === 'email') {
			this.setState({ email: e.target.value });
		} else if (e.target.name === 'email2') {
			this.setState({ email2: e.target.value });
		} else if (e.target.name === 'password') {
			this.setState({ password: e.target.value });
		} else if (e.target.name === 'password2') {
			this.setState({ password2: e.target.value })
		} else if (e.target.name === 'first_name') {
			this.setState({ first_name: e.target.value })
		} else if (e.target.name === 'last_name') {
			this.setState({ last_name: e.target.value })
		}

		console.log(this.state);
	};

	createNewUserProfile = (firstName, lastName, email, password) => {
		let newUser = {
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: password,
			dateCreated: new Date(),
			timers: []
		}

		return newUser;
	}

	checkForExistingUser = () => {
		let found = this.state.usersData.filter(
			(user) => user.data().email.toLowerCase() === this.state.email /* && user.data().password === password */
		);

		return found;
	}

	handleSubmitRegister = (e) => {
		e.preventDefault();
		// Verify that user does not alrready exist
		let foundUser = this.checkForExistingUser();
		// console.log(foundUser[0].data());
		try {
			if (foundUser.length > 0) {
				console.log('An account with that email already exists.')
			} else {
				let user = this.createNewUserProfile(this.state.first_name, this.state.last_name, this.state.email, this.state.password);
				console.log(user);
				firebase.firestore().collection('users').add(user);

				this.setState({ setView: 'login' });
				this.props.history.push('/login');
			}

		} catch (error) {
			console.log(error);
		}

		this.getCurrentDBstate();
	};

	handleSubmitLogin = (e) => {
		e.preventDefault();

		this.getCurrentDBstate();
		let foundUser = this.checkForExistingUser();

		console.log(foundUser);

		try {
			if (foundUser[0].exists) {
				console.log(foundUser[0].data().password);
				console.log(this.state.password);
				if (foundUser[0].data().password === this.state.password) {
					this.props.getUser(foundUser[0].data());
					this.props.setLoginStatus();
					this.props.history.push('/');
				} else {
					this.setState({ errorMsg: 'Invalid password' });

					this.setState({ showError: 'block' });

					setTimeout(() => {
						this.setState({ showError: 'hidden' });
					}, 3000);
				}
			}
		} catch (error) {
			console.log(error);
			this.setState({ errorMsg: 'Invalid email and password' });
			this.setState({ showError: 'block' });
			setTimeout(() => {
				this.setState({ showError: 'hidden' });
			}, 3000);
		}
	};

	render() {
		if (this.state.setView === 'login') {
			return (
				<div className='Login'>
					<div className='Login--container'>
						<div className={`Login--errormessage`} style={{ display: this.state.showError }}>
							<h4>{this.state.errorMsg}</h4>
						</div>
						<header className='Login--header'>
							<h2>LOGIN</h2>
						</header>
						<main className='Login--main'>
							<form className='Login--form'>
								<input
									type='text'
									name='email'
									id='email'
									placeholder='email'
									onChange={this.getFormData}
									value={this.state.email}
									required
								/>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='password'
									onChange={this.getFormData}
									value={this.state.password} // encrypt me
									required
								/>
								<button type='submit' onClick={this.handleSubmitLogin}>
									Login
								</button>
							</form>
							<p className='Login--register'>
								Not a member?
								<span className='Login--register-link'>
									<a href="#" onClick={() => this.setState({ setView: 'register' })}> Register</a>
								</span>
							</p>
						</main>
					</div>
				</div>
			);
		} else if (this.state.setView === 'register') {
			return (
				<div className='Login'>
					<div className='Login--container'>
						<header className='Login--header'>
							<h2>REGISTER</h2>
						</header>
						<main className='Login--main'>
							<form className='Login--form'>
								<input
									type='text'
									name='first_name'
									id='first_name'
									placeholder='first name'
									onChange={this.getFormData}
									value={this.state.first_name}
									required
								/>
								<input
									type='text'
									name='last_name'
									id='last_name'
									placeholder='last name'
									onChange={this.getFormData}
									value={this.state.last_name}
									required
								/>
								<input
									type='text'
									name='email'
									id='email'
									placeholder='email'
									onChange={this.getFormData}
									value={this.state.email}
									required
								/>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='password'
									onChange={this.getFormData}
									value={this.state.password}
									required
								/>
								<input
									type='password'
									name='password2'
									id='password2'
									placeholder='confirm password'
									onChange={this.getFormData}
									value={this.state.password2}
									required
								/>
								<button type='submit' onClick={this.handleSubmitRegister}>
									Register
								</button>
							</form>
							<p className='Login--register'>
								Already a member?
								<span className='Login--register-link'>
									<a href="#" onClick={() => this.setState({ setView: 'login' })}> Log in</a>
								</span>
							</p>
						</main>
					</div>
				</div>
			);
		}
	}
}

export default Login;
