import React, {Fragment, useState} from 'react'
import AddUserForm from './AddUserForm'
import EditUserForm from './EditUserForm'
import UserTable from '../tables/UserTable'

const UserForm = () => {
    const usersData = [
        {id: 1, name: 'Tania', username: 'floppydiskette'},
        {id: 2, name: 'Craig', username: 'siliconeidolon'},
        {id: 3, name: 'Ben', username: 'benisphere'},
    ];

    const initialFormState = {id: null, name: '', username: ''};

    // Setting state
    const [users, setUsers] = useState(usersData);
    const [currentUser, setCurrentUser] = useState(initialFormState);
    const [editing, setEditing] = useState(false);

    // CRUD operations
    const addUser = user => {
        user.id = users.length + 1;
        setUsers([...users, user])
    };

    const deleteUser = id => {
        setEditing(false);

        setUsers(users.filter(user => user.id !== id))
    };

    const updateUser = (id, updatedUser) => {
        setEditing(false);

        setUsers(users.map(user => (user.id === id ? updatedUser : user)))
    };

    const editRow = user => {
        setEditing(true);
        setCurrentUser({id: user.id, name: user.name, username: user.username})
    };

    return (
        <Fragment>
            <h1>CRUD App with Hooks</h1>
            <div className="flex-column">
                <div className="flex-large">
                    {editing ? (
                        <Fragment>
                            <h2>Edit user</h2>
                            <EditUserForm
                                editing={editing}
                                setEditing={setEditing}
                                currentUser={currentUser}
                                updateUser={updateUser}
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <h2>Add user</h2>
                            <AddUserForm addUser={addUser}/>
                        </Fragment>
                    )}
                </div>

                <div className="flex-large">
                    <h2>View users</h2>
                    <UserTable users={users} editRow={editRow} deleteUser={deleteUser}/>
                </div>
            </div>
        </Fragment>
    )
}

export default UserForm
