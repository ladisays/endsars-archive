import Media from './Media';

const StoryDetail = ({ id, title, text, ...story }) => {
  return (
    <div>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Media sources={story.media} />
    </div>
  );
};

export default StoryDetail;
