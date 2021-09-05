import React, { useState } from "react";
import "../Styles/SignIn.css";
import amazonLogo from "../assets/amazon-logo.svg";
import { Link, useHistory } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const dispatch = useDispatch();
	const history = useHistory();

	const signIn = (e) => {
		e.preventDefault();
		if (email.length === 0) {
			setEmailError("Please enter the email address");
			setTimeout(() => {
				setEmailError("");
			}, 6000)
		} else if (password.length === 0) {
			setPasswordError("Please enter the password");
			setTimeout(() => {
				setPasswordError("");
			}, 6000) 
		} else {
			signInWithEmailAndPassword(auth, email, password).then((userCred) => {
				console.log(userCred);
				dispatch(setUser(userCred.user));
				history.push("/");
			})
		}
	}

	return (
		<div className="signIn">
			<Link to="/">
				<img 
					src={amazonLogo}
					alt=""
					className="signIn__amazonLogo"
				/>
			</Link>

			<div className="signIn__container">
				<h1> Sign-In </h1>
				<form>
					<label for="email-input"> Email or mobile phone number </label>
					<input 
						type="email" 
						id="email-input" 
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>

					{ emailError.length ? <div> {emailError} </div> : <> </> }

					<label for="password-input"> Password </label>
					<input 
						value={password}
						onChange={e => setPassword(e.target.value)}
						type="password" 
						id="password-input" 

					/>

					{ passwordError ? <div> { passwordError } </div> : <> </> }

						<button onClick={signIn}> Continue </button>

				</form>
				<p>
					By continuing, you agree to FAKE Amazon's Conditions of Use and Privacy Notice.
				</p>
				<div>
					<AiFillCaretRight />
					<p> Need help? </p>
				</div>
			</div>

			<div className="signIn__signUpInfo">
				<div> New to Amazon </div>
				<Link to="/signup" style={{width: "100%"}}>
					<button> Create your Amazon account </button>
				</Link>
			</div>
		</div>
	)
}

export default SignIn;