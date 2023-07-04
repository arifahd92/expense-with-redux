import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './ForgotPassword.module.css'

const ForgotPassword = () => {

    const [email, setEmail] = useState();
    const [sending, setsending] = useState(false);
    const redirect = useNavigate();


    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCd6ahJjYNQaAxx13PKKsZcxp4-0dqhnjs'

    const submitHandler = async (e) => {
        e.preventDefault();
        setsending(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: email
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setsending(false)
            const data = await response.json();
            console.log(data);
            if (data.error) {
                alert(data.error.message)
            } else {
                alert('Check your email inbox and reset password');
                redirect('/');
            }
        } catch (err) {
            setsending(false)
            alert(err)
        }
    }

    return (
        <Fragment>
            <div className={classes.main}>

                <div className={classes.form}>
                    <label>Enter the email with which you have registerd</label>
                    <input type='email' onChange={emailChangeHandler} value={email} />
                    {!sending && <button type='submit' onClick={submitHandler}>Send link</button>}
                    {sending && <p>Sending request...</p>}
                    <Link to="/">Already a user ? Login</Link>
                </div>

            </div>
        </Fragment>
    )
}

export default ForgotPassword