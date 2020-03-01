import React, { Component } from 'react'
import request from 'superagent';

export default class UserLogin extends Component {
    //set state for user name and password
    state = {
        userSignIn: '',
        passwordSignIn: '',
        userSignUp: '',
        passwordSignUp: '',
    }
    
    //create handleSignIn
    handleSignIn = async() => {
        const signIn = await request.post(`https://cryptic-coast-58268.herokuapp.com/api/auth/signin`, {
            email: this.state.userSignIn,
            password: this.state.passwordSignIn,
        })
        localStorage.setItem('user', JSON.stringify(signIn.body));
        this.props.history.push('/');
    }

    //create handleSignUp
    handleSignUp = async() => {
        const signUp = await request.post(`https://cryptic-coast-58268.herokuapp.com/api/auth/signup`, {
            email: this.state.userSignUp, 
            password: this.state.passwordSignUp,
        })
        localStorage.setItem('user', JSON.stringify(signUp.body));
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <input value={ this.state.userSignUp } onChange={(e) => this.setState({ userSignUp: e.target.value})} />
                <input value={ this.state.passwordSignUp } onChange={(e) => this.setState({passwordSignUp: e.target.value})} />

                <button onClick={ this.handleSignUp }> Sign Up Here!</button>

                <input value={ this.state.userSignIn } onChange={(e) => this.setState({ userSignIn: e.target.value})} />
                <input value={ this.state.passwordSignIn } onChange={(e) => this.setState({passwordSignIn: e.target.value})} />

                <button onClick={ this.handleSignIn }> Returning Users Sign In Here!</button>

            </div>
        )
    }
}
