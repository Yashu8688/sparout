import React, { useState } from 'react';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import './CommunityFeed.css';

const CommunityFeed = ({ isTab = false }) => {
  const [activeTab, setActiveTab] = useState('feed');

  const feedPosts = [
    {
      id: 1,
      user: 'Master Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=800',
      caption: 'Incredible energy at today\'s MMA workshop! The level of discipline is rising every day. Keep grinding warriors! 🥋💪',
      hashtags: '#MMA #TrainingDay #MasterChen #EliteAcademy',
      likes: '1.2k',
      comments: '84',
      time: '2h ago'
    },
    {
      id: 2,
      user: 'Yashwanth Raj',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
      type: 'video',
      content: 'https://images.unsplash.com/photo-1599058917233-3580e6d23132?auto=format&fit=crop&q=80&w=800',
      caption: 'Perfecting my BJJ blue belt techniques. Thanks for the guidance Master! @MasterChen',
      hashtags: '#BJJ #BlueBelt #MMA #MartialArts',
      likes: '850',
      comments: '32',
      time: '5h ago'
    }
  ];

  return (
    <div className={`CommunityFeed-Container ${isTab ? 'is-tab' : ''}`}>
      {!isTab && <Header />}
      
      <main className="CommunityFeed-Main">
        <div className="CommunityFeed-Stories">
          <div className="CommunityFeed-StoryItem">
            <div className="CommunityFeed-AddStory">+</div>
            <span>Your Story</span>
          </div>
          {feedPosts.map(post => (
            <div key={post.id} className="CommunityFeed-StoryItem">
              <div className="CommunityFeed-StoryRing">
                <img src={post.avatar} alt={post.user} />
              </div>
              <span>{post.user.split(' ')[0]}</span>
            </div>
          ))}
        </div>

        <div className="CommunityFeed-PostList">
          {feedPosts.map(post => (
            <div key={post.id} className="CommunityFeed-PostCard">
              <div className="CommunityFeed-PostHeader">
                <div className="CommunityFeed-UserInfo">
                  <img src={post.avatar} alt={post.user} className="CommunityFeed-UserAvatar" />
                  <div className="CommunityFeed-UserMeta">
                    <span className="CommunityFeed-UserName">{post.user}</span>
                    <span className="CommunityFeed-PostTime">{post.time}</span>
                  </div>
                </div>
                <button className="CommunityFeed-MoreBtn">•••</button>
              </div>

              <div className="CommunityFeed-PostMedia">
                <img src={post.content} alt="Post content" />
                {post.type === 'video' && (
                  <div className="CommunityFeed-VideoOverlay">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                )}
              </div>

              <div className="CommunityFeed-PostActions">
                <div className="CommunityFeed-LeftActions">
                  <button className="CommunityFeed-ActionBtn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                  <button className="CommunityFeed-ActionBtn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  </button>
                  <button className="CommunityFeed-ActionBtn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polyline points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </div>
                <button className="CommunityFeed-ActionBtn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </button>
              </div>

              <div className="CommunityFeed-PostInfo">
                <span className="CommunityFeed-LikesCount">{post.likes} likes</span>
                <p className="CommunityFeed-Caption">
                  <span className="CommunityFeed-CaptionUser">{post.user}</span> {post.caption}
                </p>
                <span className="CommunityFeed-Hashtags">{post.hashtags}</span>
                <button className="CommunityFeed-ViewComments">View all {post.comments} comments</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {!isTab && <Footer activeTab="feed" />}
    </div>
  );
};

export default CommunityFeed;
