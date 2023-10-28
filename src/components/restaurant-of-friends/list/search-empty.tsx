import React from 'react';

interface Props {
    message: string;
}

const SearchEmpty: React.FC<Props> = ({ message }) => {
    return (
        <div>
            <p>{message}</p>
        </div>
    );
};

export default SearchEmpty;
