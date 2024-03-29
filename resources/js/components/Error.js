import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const query = gql`
    {
        user
    }
`

const Error = () => {
    const [isShown, toggle] = useState(false);
    const display = isShown ? 'block' : 'none';

    return (
        <Query query={query}>
            {({loading, error, data}) => {
                if (loading) return <p>Loading...</p>;
                if (error) return (
                    <div style={{marginLeft: 'auto', marginRight: 'auto', width: 300}}>
                        <button type="button" onClick={() => toggle(!isShown)}>See Query Error</button>
                        <div style={{display}}>
                            <h2>Error Message</h2>
                            <p>{error.toString()}</p>
                        </div>
                    </div>);

                return <>Error Component</>
            }}
        </Query>
    );
}

export default Error;
