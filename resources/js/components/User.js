import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const ErrorMessage = (e) => <p>Error: {e.toString()}</p>;

const query = gql`
    {
        usersOrderByWithPage(
            orderBy: [{field: "id", order: DESC}]
            count: 3
        ) {
            data {
                id
                name
                email
            }
        }
    }
`

const UserQuery = () => (
    <Query query={query}>
        {({loading, error, data}) => {
            if (loading) return <p>loading...</p>;
            if (error) return <ErrorMessage e={error}/>;

            return (
                <>
                    <h2>User List</h2>
                    {data.usersOrderByWithPage.data.map(({id, name, email}) => (
                        <div key={id} style={{textAlign: 'left'}}>
                            <p>id: {id}</p>
                            <p>name: {name}</p>
                            <p>email: {email}</p>
                        </div>
                    ))}
                </>
            );
        }}
    </Query>
);

const CREATE_USER = gql`
    mutation($name: String!, $email: String!, $password: String!) {
        createUser (name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`

const CreateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <h2>Create</h2>
            <div style={{textAlign: 'left'}}>
                <p>name:{` `}<input type="text" onChange={e => setName(e.target.value)}/></p>
                <p>email:{` `}<input type="text" onChange={e => setEmail(e.target.value + '@gmail.com')}/>:@gmail.com
                </p>
                <p>password:{` `}<input type="text" onChange={e => setPassword(e.target.value)}/></p>
            </div>
            <Mutation
                mutation={CREATE_USER}
                variables={{name, email, password}}
            >
                {(createUser, {loading, error, data}) => (
                    <>
                        <button type="button" onClick={createUser}>Register</button>
                        {error && <ErrorMessage error={error}/>}
                        {data && <>
                            <h3>Success Create</h3>
                            <p>ID: {data.createUser.id}</p>
                            <p>Name: {data.createUser.name}</p>
                        </>
                        }
                    </>
                )}
            </Mutation>
        </>
    )
}

const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $name: String!) {
        updateUser(id: $id, name: $name) {
            id
            name
        }
    }
`

const UpdateUser = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState(0);

    return (
        <>
            <h2>Update</h2>
            <Mutation
                mutation={UPDATE_USER}
                variables={{id, name}}
            >
                {(updateUser, {loading, error, data}) => (
                    <>
                        <div style={{textAlign: 'left'}}>
                            <p>ID: <input type="number" onChange={e => setId(e.target.value)}/></p>
                            <p>New Name: <input type="text" onChange={e => setName(e.target.value)}/></p>
                        </div>
                        <button type="button" onClick={updateUser}>Updte</button>
                        {error && <ErrorMessage e={error}/>}
                        {data && <>
                            <h3>Update Success</h3>
                            <p>name: {data.updateUser.id}</p>
                        </>
                        }
                    </>
                )}
            </Mutation>
        </>
    );
}

const DELETE_USER = gql`
    mutation ($id: ID!) {
        deleteUser(id: $id) {
            id
            name
            email
        }
    }
`

const DeleteUser = () => {
    const [id, setId] = useState(0);

    return (
        <>
            <h2>Delete</h2>
            <Mutation
                mutation={DELETE_USER}
                variables={{id}}
            >
                {(deleteUser, {loading, error, data}) => (
                    <>
                        <div style={{textAlign: 'left'}}>
                            <p>ID: <input type="number" onChange={e => setId(e.target.value)}/></p>
                            <button type="button" onClick={deleteUser}>Delete</button>
                        </div>
                        {error && <ErrorMessage e={error}/>}
                        {data && <>
                            <h3>Delete Success</h3>
                            <p>ID: {data.deleteUser.id}</p>
                        </>
                        }
                    </>
                )}
            </Mutation>
        </>
    )
};

const User = () => (
    <div style={{display: 'flex'}}>
        <div style={{marginLeft: 30, marginRight: 30,}}>
            <UserQuery/>
        </div>
        <div style={{marginLeft: 30, marginRight: 30,}}>
            <CreateUser/>
        </div>
        <div style={{marginLeft: 30, marginRight: 30,}}>
            <UpdateUser/>
        </div>
        <div style={{marginLeft: 30, marginRight: 30,}}>
            <DeleteUser/>
        </div>
    </div>
);

export default User;
