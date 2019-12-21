import React from "react"
import { RouteComponentProps, Link, navigate } from "@reach/router" // eslint-disable-line no-unused-vars
import useForm from 'react-hook-form'
import styled, { css } from "styled-components"

const FormContainer = styled.section`
display: flex;
flex-direction: column;
background: #fff;
padding: 20px;
margin-top: 20px;
box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.5);
.err-msg {
    color: red;
    margin: 5px 0;
}
`

const LoginForm = styled.form`
display: flex;
flex-direction: column;
`

const FormGroup = styled.div`
    margin-bottom: 20px;
    input {
        padding: 15px;
        border: 1px solid #eee;
        background: #eee;
    }
`

const BtnStyle = css`
color: #fff;
padding: 15px;
border: 0;
cursor: pointer;
transition: 0.3s ease-in-out;
text-align: center;
font-family: "capture_it";
`


const SubmitBtn = styled.button`
${BtnStyle};
background: #0f9b0f;
&:hover {
    background: #0d6e0d;
}
`

const PlayBtn = styled(Link)`
${BtnStyle};
background: #9c1515;
text-decoration: none;
&:hover {
    background: #6e0d0d;
}
`

const Separator = styled.div`
text-align: center;
margin: 15px 0;
color: #818181;
font-family: "capture_it";
`

const users = [
    {
        "name": "John",
        "username": "johndoe",
        "password": "123456",
        "history": [
            {
                "date": "1576992633000",
                "wpm": "20",
                "cp": "30"
            }, {
                "date": "1576952634000",
                "wpm": "10",
                "cp": "20"
            }, {
                "date": "1576932635000",
                "wpm": "30",
                "cp": "10"
            }
        ]
    },
    {
        "name": "Sarah",
        "username": "sarahdoe",
        "password": "123456",
        "history": [
            {
                "date": "1576932633000",
                "wpm": "30",
                "cp": "100"
            }
        ]
    }
]

interface Props extends RouteComponentProps {

}

const Login: React.FC<Props> = () => {
    const { register, handleSubmit, errors, setError } = useForm()
    const onSubmit = (data: any) => {
        const user = users.find((user) => {
            if (
                user.username === data.username &&
                user.password === data.password
            ) {
                return user
            }
            return undefined
        })
        if (user) {
            navigate('game', { state: user })
        } else {
            setError('username', 'invalidCredentials')
            setError('password', 'invalidCredentials')
        }
    }

    return (
        <FormContainer>
            <LoginForm onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <input name="username" ref={register({ required: true })} placeholder='Username' />
                    <div className='err-msg'>{(errors.username?.type === 'required') && 'Username is required.'}</div>
                </FormGroup>
                <FormGroup>
                    <input name="password" ref={register({ required: true })} placeholder='Password' type='password' />
                    <div className='err-msg'>{(errors.password?.type === 'required') && 'Password is required'}</div>
                </FormGroup>
                {
                    (errors.username?.type === 'invalidCredentials') &&
                    (errors.password?.type === 'invalidCredentials') &&
                    <div className='err-msg'>Invalid username or password</div>
                }

                <SubmitBtn>Login</SubmitBtn>
            </LoginForm>
            <Separator>
                OR
            </Separator>
            <PlayBtn to='game'>Play Now</PlayBtn>
        </FormContainer>
    )
}

export default Login