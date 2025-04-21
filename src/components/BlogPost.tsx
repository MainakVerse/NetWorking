/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type BlogArticle = {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: { name: string };
};

const YOUR_GNEWS_API_KEY = process.env.NEXT_PUBLIC_YOUR_GNEWS_API_KEY

export default function EndlessBlog() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const keywords = ['networking', 'cybersecurity', 'protocols', 'network architecture'];
      const query = keywords.join(' OR ');
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&page=${page}&apikey=${YOUR_GNEWS_API_KEY}`
      );
      const data = await response.json();
      setArticles((prev) => [...prev, ...data.articles]);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading]);

  return (
    <div className="p-4 mt-16 max-w-4xl mx-auto">

      <h1 className="text-3xl text-green-400 font-bold mb-6">Real-Time Networking & Cyber Security Blogs For You</h1>
      {articles.map((article, index) => (
        <div key={index} className="mb-8 border-b pb-4">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <h2 className="text-xl font-semibold text-white">{article.title}</h2>
          </a>
          <p className="text-gray-700 mt-1">{article.description}</p>
          <p className="text-sm text-gray-500 mt-1">{article.source.name} – {new Date(article.publishedAt).toLocaleString()}</p>
        </div>
      ))}
      <div ref={loaderRef} className="text-center py-6">
        {loading ? 'Loading more blogs...' : 'Scroll to load more'}
      </div>
    </div>
  );
}
