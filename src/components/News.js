import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import InfiniteScroll from "react-infinite-scroll-component";

const News= (props)=>  {
const [articles,setArticles] = useState([0]);
const [page,setPage] = useState(1);
const [loading,setLoading] = useState(true);
const [totalResults,setTotalResults] = useState(0);



  const capitalize=(string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const loadNews = async ()=> {
     props.setProgress(10);
    const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`);
    setLoading(true);
    props.setProgress(50);
    let parseData = await data.json();
     props.setProgress(75);
     setArticles(parseData.articles);
     setLoading(false);
     setTotalResults(parseData.totalResults)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = capitalize(props.category)
    loadNews();
   // eslint-disable-next-line
    
 },[])

 const fetchMoreData = async ()=> {
    const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page +1}&pageSize=${props.pageSize}`);
    setPage(page +1)
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
  }
  
    return (
      <>
        <h2 className='text-center'>NewsMantra - Top Headlines</h2>
         {loading && <Loading/>}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loading/>}
        >
        <div className="container">

        <div className="row">
          
          { articles.map((e, index)=>{
            return <div className="col-md-4" key={`${e.url}-${index}`}>
                <NewsItem title={e.title}  description={e.description} imageUrl={e.urlToImage} keyId={e.url} author={e.author} date={e.publishedAt}
                // source={e.source.name}
                 /> 
            </div>
          })
        }
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }


export default News;
