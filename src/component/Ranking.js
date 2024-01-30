import React from 'react';

export default function Ranking() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    return (
        <div>
            <h1>{formattedDate}</h1>
        </div>
    );
}
