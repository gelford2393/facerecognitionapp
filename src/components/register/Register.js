import React, { useState } from 'react'

const Register = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onSubmitRegister = e => {
        e.preventDefault();
        console.log(name, email, password);
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(user => {
            if (user) {
                props.loadUser(user)
                props.onRouteChange('home')
            }
        })
    }
    return (
        <div>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center tc shadow-5">
        <main className="pa4 black-80">
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign Up Form</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input 
                    onChange={onChangeName}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="text" 
                    name="name"  
                    id="name"/>
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                    onChange={onChangeEmail}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="email" 
                    name="email-address"  
                    id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                    onChange={onChangePassword}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" 
                    name="password"  
                    id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input
                onClick={onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Register" 
                />
                </div>
            </form>
        </main>
        </article>
        </div>
    )
}

export default Register
