import React, {useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const  updateNews = async() =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading({loading : true});
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);

    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `NewsBuddy - ${capitalizeFirstLetter(props.category)}`;
    updateNews();
  },[])

  const handlePrevNews = async () =>{
    setPage(page-1)
    updateNews();
  }

  const handleNextNews = async () =>{
    setPage(page+1)
    updateNews();
  }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

    return (
    <>
        <h1 className="text-center" style={{ margin : "91px 0px 0px 0px",}}>NewsBuddy - Top {capitalizeFirstLetter(props.category)} Headlines!</h1>

        {loading && <Spinner/>}

        <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={articles.length !== totalResults}
              loader={<Spinner/>}
        >
            <div className="container">

              <div className="row">
                {articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        {/* <NewsItem title = {element.title ? element.title.slice(0,21) : ""} description = {element.description ? element.description.slice(0,51) : ""} imageUrl = {element.urlToImage} newsUrl = {element.url}/> */}
                        <NewsItem title = {element.title} description = {element.description} imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
                      </div>
            })}
            </div>
        </div>
      </InfiniteScroll>
    </>
    )
}

export default News

News.defaultProps = {
  country : 'in',
  pageSize : 9,
  category : "general",
  title : "NewsBuddy - Daily News From Planet's - Free"
}

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string,
  title : PropTypes.string
}