import React from 'react';
import PostCard from './PostCard';

const Comment = ({ children }) => {
    return (
        <div className="mt-3">
            <PostCard>{children}</PostCard>
        </div>
    );
};

export default Comment;
