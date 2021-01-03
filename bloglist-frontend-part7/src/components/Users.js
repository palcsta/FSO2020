
import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { Table } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"

const style = {
    color: "purple",
    background: "lightgrey",
    display: "",
    "borderStyle": "solid",
    "borderRadius": "20px",

};


const User = ({ user }) => {
    const [showUser, setShowUser] = useState(false)

    if (!user) { return null }


    return (<>
        <span title={showUser ? "hide users blogs" : "show users blogs"}><div onClick={() => setShowUser(!showUser)}><b >{user.name}</b><i>({user.username})</i>
            {showUser ?
                <ul>{user.blogs.length != 0 ?
                    user.blogs.map(x =>
                        <li>{x.title}</li>
                    )
                    : "No blogs..."}</ul> : ""}</div></span></>


    )
}


const Users = () => {
    const [users, setUsers] = useState([{ username: "Didn't load any users..", id: 0, blogs: [{ title: "yo" }] },
    { username: "Didn'..", id: 0, blogs: [{ title: "zz" }] }])


    useEffect(() => {
        userService.getAll().then(x =>
            setUsers(x)
        )
    }, [])


    console.log(console.log(users))

    return (
        <>{/*users.map(x => <ul>{x}</ul>)*/}
            {users[0].username !== "Didn't load any users..." ?
                users.map(user =>
                    <Table striped bordered>
                        <tbody>
                            <tr key={user.id}>
                                <td>

                                    <Link to={`/users/${user.id}`}>
                                        <User key={user.id} user={user} />


                                    </Link>


                                </td>
                                <td width="10%">
                                    {user.blogs.length}
                                </td>
                            </tr>
                        </tbody>
                    </Table>) : "No users to show..."}


        </>)
}

export default Users
