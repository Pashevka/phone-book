import React from 'react';

import { ApiWrapperConsumer } from './api-wrapper-context'
const withApiWrapper = () => (Wrapped) => {

    return (props) => {
        return (
            <ApiWrapperConsumer>
                {
                    (apiWrapperService) => {
                        return <Wrapped
                            {...props}
                            apiWrapper={apiWrapperService} />
                    }
                }
            </ApiWrapperConsumer>
        );
    }
};

export default withApiWrapper;