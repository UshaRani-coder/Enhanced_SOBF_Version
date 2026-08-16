import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from './PostCard.jsx';

const PostList = ({
  posts,
  hasMore,
  loadMore,
  detailRoute,
  title,
  baseURL,
  isHomePage,
}) => {
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMore}
      hasMore={hasMore}
      loader={
        !isHomePage ? (
          <h4 className="text-center w-full py-4">Loading more...</h4>
        ) : null
      }
      endMessage={
        !isHomePage && posts.length > 0 ? (
          <p className="text-center text-gray-500 py-6">
            You've reached the end.
          </p>
        ) : null
      }
      scrollableTarget="scrollableDiv"
      style={{ display: 'flex', flexDirection: 'column' }}
      inverse
    >
      <div className="flex flex-col items-center lg:flex-row lg:items-stretch lg:justify-center lg:flex-wrap gap-[30px] w-full lg:gap-[50px] p-5">
        {posts.map((news,index) => (
          <PostCard
            key={news._id}
            news={news}
            detailRoute={detailRoute}
            title={title}
            baseURL={baseURL}
            isPriority={index === 0}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default React.memo(PostList);
