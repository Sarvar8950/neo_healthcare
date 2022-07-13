import React from 'react'
// import store from '../auth/Store'

export default function Login({setlogedin}) {
    const [email, setemail] = React.useState("")
    const [name, setname] = React.useState("")
    const [contact, setcontact] = React.useState("")
    const [password, setpassword] = React.useState("")
    const [loginemail, setloginemail] = React.useState("")
    const [loginpassword, setloginpassword] = React.useState("")

    function registeruser() {
        var obj = {
            email,
            name,
            contact,
            password
        }
        console.log(obj)
        fetch('http://localhost:3001/user', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((res) => console.log(res))
    }

    function loginuser() {
        var obj = {
            loginemail,
            loginpassword
        }
        // console.log(obj)
        fetch('http://localhost:3001/user')
            .then((res) => res.json())
            .then((res) => {
                res.map((ele) => {
                    if (ele.email === loginemail && ele.password === loginpassword) {
                        // store.dispatch({action : "LOGIN"})
                        setlogedin(true)
                        return;
                    }
                })
            })
    }


    return (
        <div>
            <input type="text" placeholder='emal' onChange={(e) => setemail(e.target.value)} />
            <input type="text" placeholder='name' onChange={(e) => setname(e.target.value)} />
            <input type="number" placeholder='number' onChange={(e) => setcontact(e.target.value)} />
            <input type="text" placeholder='password' onChange={(e) => setpassword(e.target.value)} />
            <button onClick={registeruser}>Register</button>
            <br />
            <br />
            <input type="text" placeholder='emal' onChange={(e) => setloginemail(e.target.value)} />
            <input type="text" placeholder='password' onChange={(e) => setloginpassword(e.target.value)} />
            <button onClick={loginuser}>Login</button>
        </div>
    )
}
