import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../axios.js';
import { FaThumbsUp, FaBell, FaBookmark } from 'react-icons/fa';
import { timeDifference } from '../../utils/timeDiff.js'; // Adjust the import path as needed

const VideoPage = () => {
  const { id } = useParams();
  const accessToken = useSelector(state => state.auth.accessToken);
  const user = useSelector(state => state.auth.user);
  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoResponse = await axios.get(`/video/v/${id}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setVideo(videoResponse.data.data);
        setLikes(videoResponse.data.data.likesCount);
        setIsLiked(videoResponse.data.data.isLiked);

        const commentsResponse = await axios.get(`/comment/${id}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setComments(commentsResponse.data.data.docs);

        const recommendedResponse = await axios.get(`/video`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setRecommendedVideos(recommendedResponse.data.data.docs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching video data:', error);
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchVideoData();
    }
  }, [id, accessToken]);
  const VideoTitle = ( title ) => {
    // Function to process the title based on its length
    const formatTitle = (title) => {
      if (title.length > 20) {
        return `${title.substring(0, 20)}...`;
      }
      return title;
    };
    //console.log(formatTitle(title),'tittle len')
    return <div>{formatTitle(title)}</div>;
  };

  const handleSubscribeToggle = async () => {
    try {
      const response = await axios.post(`/subscriptions/c/${video.owner._id}`, {}, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      setVideo((prevVideo) => ({
        ...prevVideo,
        owner: {
          ...prevVideo.owner,
          isSubscribed: !prevVideo.owner.isSubscribed,
          subscribersCount: !prevVideo.owner.isSubscribed ? prevVideo.owner.subscribersCount + 1 : prevVideo.owner.subscribersCount - 1
        }
      }));
    } catch (error) {
      console.error('Error toggling subscription:', error);
    }
  };

  const handleLikeToggle = async () => {
    try {
      await axios.post(`/likes/toggle/v/${video._id}`, {}, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;

    try {
      await axios.post(`/comment/${id}`, { content: newComment }, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      setNewComment('');
      const commentsResponse = await axios.get(`/comment/${id}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      setComments(commentsResponse.data.data.docs);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleSaveVideo = async () => {
    try {
      const response = await axios.get(`/playlist/user/${user._id}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      setPlaylists(response.data.data);
      setIsPlaylistModalOpen(true);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      await axios.patch(`/playlist/add/${video._id}/${playlistId}`, {}, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      setIsPlaylistModalOpen(false);
    } catch (error) {
      console.error('Error adding video to playlist:', error);
    }
  };
  

  const currentTime = useMemo(() => new Date(), [video]);
  const createdAtTime = useMemo(() => new Date(video?.createdAt), [video?.createdAt]);
  const timeAgo = useMemo(() => timeDifference(currentTime, createdAtTime), [currentTime, createdAtTime]);

  if (loading) return <div>Loading...</div>;
  if (!video) return <div>Error loading video.</div>;

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 bg-black text-white">
      <div className="flex-1 p-4 space-y-6">
        <div className="lg:max-w-5xl lg:mx-auto">
          <div className="relative pt-[56.25%] h-0 overflow-hidden rounded-lg shadow-xl">
            <iframe
              src={video.videoFile?.url}
              title={ VideoTitle(video.title)}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{video.title}</h1>
          <p className="text-white text-lg">
            {video.views} views • {timeAgo}
          </p>
        </div>
        <div className="flex justify-between items-center py-4 border-b border-gray-200">
          <div className="flex items-center">
            <a href={`/channel/${video.owner._id}/${video.owner.username}`}><img
              src={video.owner?.avatar?.url}
              alt={video.owner?.username}
              className="w-12 h-12 rounded-full mr-4"
            /></a>
            <div>
              <h2 className="text-xl font-bold">{video.owner?.username}</h2>
              <p className="text-white">{video.owner?.subscribersCount} subscribers</p>
            </div>
            <button
              onClick={handleSubscribeToggle}
              className={`ml-4 px-4 py-2 ${video.owner.isSubscribed ? 'bg-gray-500' : 'bg-red-500'} text-white rounded hover:${video.owner.isSubscribed ? 'bg-gray-600' : 'bg-red-600'}`}
            >
              <FaBell className="inline-block mr-2" />
              {video.owner.isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLikeToggle}
              className={`flex items-center text-2xl mr-4 ${isLiked ? 'text-blue-500' : 'text-white'}`}
            >
              <FaThumbsUp className="mr-2 text-2xl" /> {likes}
            </button>
            <button
              onClick={handleSaveVideo}
              className="flex items-center text-lg"
            >
              <FaBookmark className="mr-2 text-2xl text-white" /> Save
            </button>
          </div>
        </div>
        <div className="text-white">
          <p>{video.description}</p>
        </div>
        <div className="pt-6 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full text-black p-2 border border-gray-300 rounded bg-gray-200"
              rows="3"
              placeholder="Write a comment..."
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
            >
              Comment
            </button>
          </div>
          {comments.map((comment) => (
            <div key={comment._id} className="flex mb-6">
              <img
                src={comment.owner.avatar.url}
                alt={comment.owner.username}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <p className="font-bold">{comment.owner.username}</p>
                <p className="text-white">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="lg:w-80 p-4">
        <h2 className="text-xl font-bold mb-4">Recommended Videos</h2>
        <div className="space-y-4">
          {recommendedVideos.map((video) => (
            <div key={video._id} className="flex">
              <a href={`/watch/${video._id}`}> <img
                src={video.thumbnail?.url}
                alt={video.title}
                className="w-40 h-24 object-cover rounded-lg mr-4"
              /></a>
              <div>
                <h3 className="font-bold">{VideoTitle(video.title)}</h3>
                <p className="text-white">
                  By {video.ownerDetails.username} • {video.views} views
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {isPlaylistModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className=" broder-2 bg-gray-700 shadow-2 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Select a Playlist</h2>
            <ul className="space-y-2">
              {playlists.map((playlist) => (
                <li
                // style={{ backgroundColor: 'black', color: 'white'}}
                  key={playlist._id}
                  onClick={() => handleAddToPlaylist(playlist._id)}
                  className="p-2 border-black text-white bg-black hover:bg-gray-800 cursor-pointer"
                >
                  {playlist.name}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsPlaylistModalOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
