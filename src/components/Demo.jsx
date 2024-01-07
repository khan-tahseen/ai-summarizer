import { useEffect, useState } from 'react';
import { linkIcon, loader, copy, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  const [article, setArticle] = useState({ url: '', summary: '' });
  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(localStorage.getItem('article'));

    if (articleFromLocalStorage) {
      setArticle(articleFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updateAllArticles = [...allArticles, newArticle];

      setArticle(newArticle);
      setAllArticles(updateAllArticles);

      localStorage.setItem('article', JSON.stringify(updateAllArticles));
    }
  };

  return (
    <section className="w-full mt-16 max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ⏎
          </button>
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              className="link_card"
              key={`link-${index}`}
              onClick={() => setArticle(item)}
            >
              <div className="copy_btn">
                <img
                  src={copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item?.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display results */}
      <div className="mt-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="text-red-500 font-satoshi text-lg font-bold text-center">
            Well, that wasn't supposed to happen. Try again later.
            <br />
            <span className="font-satoshi font-medium text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <p className='summary_box'>{article.summary}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
