import React, { useState } from "react";
import amazonLogo from "../assets/amazon-logo.svg";
import "../Styles/SignUp.css";
import { BsInfoCircle } from "react-icons/bs";
import { AiFillCaretRight } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

function SignUp() {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [reEnteredPasword, setReEnteredPasword] = useState('');

	const [userNameError, setUserNameError] = useState('');
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('');

	const history = useHistory();

	const createNewAccount = (e) => {

		e.preventDefault();

		// set erros
		if (userName.length === 0) {
			setUserNameError("Please enter your name");
			setTimeout(() => {
				setUserNameError("");
			}, 6000)
		} else if (userName.length < 3) {
			setUserNameError("User name must be over 3 characters");
			setTimeout(() => {
				setUserNameError("");
			}, 6000)
		} else if (email.length === 0) {
			setEmailError("Please enter the email address");
			setTimeout(() => {
				setEmailError("");
			}, 6000)
		} else if (password.length === 0) {
			setPasswordError("Please enter the password");
			setTimeout(() => {
				setPasswordError("");
			}, 6000)
		} else if (password.length < 6) {
			setPasswordError("Password must be over 6 character");
			setTimeout(() => {
				setPasswordError("");
			}, 6000)
		} else if (reEnteredPasword.length === 0) {
			setPasswordError("Please confirm the password");
			setTimeout(() => {
				setPasswordError("");
			}, 6000)
		} else if (reEnteredPasword !== password) {
			setPasswordError("Passwords doesn't match each other");
			setTimeout(() => {
				setPasswordError("");
			}, 6000)
		} else {
			createUserWithEmailAndPassword(auth, email, password)
			.then(userCredintial => {
				console.log(userCredintial)
				updateProfile(auth.currentUser, {
					displayName: userName
				}).then(() => {
					console.log("profile updated")
					setUserName('');
					setEmail('');
					setPassword('');
					setReEnteredPasword('');
					history.push("/")
				})
				.catch((err) => {
					alert(err.message)
				})
			})
			.catch(err => {
				alert(err.message);
			})
		}
	}

	return (
		<div className="signUp">
			<Link to="/">
				<img 
					src={amazonLogo}
					alt=""
					className="signUp__amazonLogo"
				/>
			</Link>
			<div className="signUp__container">
				<h1> Create account </h1>
				<form>
					<label for="your-name"> Your name </label>
					<input 
						value={userName}
						onChange={e => setUserName(e.target.value)}
						id="your-name"
						type="text" 
					/>

					{ userNameError.length ? <div className="signUp__container__errMsg"> { userNameError } </div> : <> </> }

					<label for="signup-email"> Email </label>
					<input 
						value={email}
						onChange={e => setEmail(e.target.value)}
						id="signup-email" 
						type="email" 
					/>

					{ emailError.length ? <div className="signUp__container__errMsg"> { emailError } </div> : <> </> }

					<label for="signup-password"> Password </label>
					<input 
						type="password" 
						id="signup-password" 
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					{ passwordError.length ? <div className="signUp__container__errMsg"> { passwordError } </div> : <> </> }
					<div className="signUp__container__info">
						<BsInfoCircle style={{color: "#3D85BB"}}/>
						<p> Passwords must be at leat 6 characters </p>
					</div>
					<label for="re-enter-password"> Re-enter password </label>
					<input 
						value={reEnteredPasword}
						onChange={e => setReEnteredPasword(e.target.value)}
						type="password" 
						id="re-enter-password"
					/>
					{ passwordError.length ? <div className="signUp__container__errMsg"> { passwordError } </div> : <> </> }
					<button type="submit" onClick={createNewAccount}> Create your amazon account </button>
					<p>
						By creating an account, you agree to FAKE Amazon's Conditions of Use and Privacy Notice.
					</p>
				</form>

				<div>
					<p> 
						Already have an account? 
						<Link to="/signin"> Sign-In <AiFillCaretRight /> </Link>
					</p>
					<p> 
						Buying for work? 
						<span>
							Create a free business account 
							<AiFillCaretRight /> 
						</span>
					</p>
				</div>
			</div>	
		</div>
	)
}

export default SignUp;