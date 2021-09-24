import React, {useState} from 'react'

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const onSubmitSignIn = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(user => {
            if (user.id) {
                props.loadUser(user)
                props.onRouteChange('home')
            }
        })
        
    }
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center tc shadow-5">
        <main className="pa4 black-80">
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input
                    onChange={onEmailChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input
                    onChange={onPasswordChange}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password"
                    name="password" 
                    id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"
                onClick={onSubmitSignIn}
                />
                </div>
                <div>
                    <p onClick={() => props.onRouteChange('register')} className="f6 link dim black underline pa3 pointer">Register</p>
                </div>
            </form>
        </main>
        </article>
    )
}

export default Signin
