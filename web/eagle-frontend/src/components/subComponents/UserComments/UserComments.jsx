import React from 'react';
import './UserComments.css';

const fakeComments = [
    {
        id: 1,
        author: 'Rajesh Gupta',
        time: '30 minutes ago',
        rating: 4,
        content: 'Several celebrities were mentioned in an amicus curiae brief filed in support of President Donald Trump\'s motion to dismiss the classified documents indictment against him.\n' +
            '\n' +
            'Trump faces 40 felony counts in Florida that accuse him of willfully retaining dozens of classified documents after he left the White House and rebuffing government demands to give them back. He has denied wrongdoing, and his lawyers have asked U.S. District Judge Aileen Cannon to dismiss the case.',
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png',
    },
    {
        id: 2,
        author: 'Amit Pradhan',
        time: '25 minutes ago',
        rating: 1,
        content: 'Magic Johnson received devastating news after a physical heading into the 1991-92 NBA season. He tested positive for HIV, a lethal virus that causes AIDS. Due to the notoriety of the killer disease, Johnson\'s NBA peers, including Larry Bird, feared for his life.\n' +
            '\n' +
            'At the time, Magic was one of the healthiest players in the league, having played a total of 98 games in the previous season. But after what the doctors said, Bird thought Johnson\'s healthy physique would deteriorate sooner rather than later.\n' +
            '\n' +
            '"We thought, at the time, there would be only ten years left," Bird told ESPN in 2012. "That\'s what the doctors were telling us."',
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png',
    },
    {
        id: 3,
        author: 'Anjali Rao',
        time: '15 minutes ago',
        rating: 2,
        content: 'A 2022 Northwestern Mutual study found that 62% of U.S. adults admit their financial planning needs improvement. However, only 35% of Americans work with a financial advisor.1\n' +
            '\n' +
            'The value of working with a financial advisor varies by person. While advisors are legally prohibited from promising returns, research suggests that people who work with a financial advisor feel more at ease about their finances and could end up with about 15% more money to spend in retirement.2\n' +
            '\n' +
            'Consider this example: A 2019 Vanguard study found that, on average, a hypothetical $500K investment would grow to over $3.4 million under the care of an advisor over ',
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png',
    }
    // ... You can add more comments as needed
];

// Helper function to determine the rating color
const UserComments = () => {
    // Helper function to determine the rating color
    const getRatingColor = (rating) => {
        if (rating >= 4) {
            return '#4CAF50'; // green
        } else if (rating >= 3) {
            return '#CDDC39'; // lime
        } else if (rating >= 2) {
            return '#FFC107'; // amber
        } else {
            return '#F44336'; // red
        }
    };

    return (
        <div className="user-comments-container">
            {fakeComments.map((comment, index) => (
                <div key={index} className="comment-post">
                    <div className="comment-rating-box" style={{ backgroundColor: getRatingColor(comment.rating) }}>
                        <span className="comment-rating-number">{comment.rating}</span>
                    </div>
                    <div className="comment-img">
                        <img src={comment.avatar} alt={`Avatar of ${comment.author}`} />
                    </div>
                    <div className="comment-details">
                        <p>
                            <span className="comment-author">{comment.author}</span>
                            <span className="comment-time">{comment.time}</span>
                        </p>
                        <p className="comment-content">{comment.content}</p>
                        <div className="comment-like-unlike">
                            <span><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></span>
                            <span><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></span>
                            <span><i className="fa fa-reply" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserComments;