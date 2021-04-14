import { useEffect, useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';

const filterSource = (type) => (source) => source.type === type;
export const StoriesContext = createContext([]);

export const StoriesProvider = ({ stories = [], ...props }) => (
  <StoriesContext.Provider value={stories} {...props} />
);

const useStories = () => {
  const stories = useContext(StoriesContext);
  const [filtered, setFiltered] = useState(stories);
  const { query } = useRouter();

  useEffect(() => {
    if (query.f) {
      setFiltered(
        stories.filter((story) => {
          if (query.f === 'text') {
            return !!story.description;
          }
          return !!story.media.find(filterSource(query.f));
        })
      );
    } else {
      setFiltered(stories);
    }
  }, [query.f, stories]);

  return [stories, filtered];
};

export default useStories;
