// import React, { Component } from 'react';
import React, { useEffect, useState } from "react";
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


// export class News extends Component {
    const News=(props)=>{

    // static defaulProps={
    //     country: 'in',
    //     pageSize: 8,
    //     category: 'general',
    // }

    // static propTypes={
    //     country: PropTypes.string,
    //     pageSize: PropTypes.number,
    //     category: PropTypes.string,
    // }

    const [articles, setArticles] =useState([])
    const [loading, setLoading] =useState(true)
    const [page, setPage] =useState(1)
    const [totalResults, settotalResults] =useState(0)

    const capitaliseFirstLetter=(string) =>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
    // constructor(props){
    //     super(props);
    //     console.log("hello i'm a constructor from news component");
    //     this.state={
    //         articles: [],
    //         loading: true,
    //         page: 1,
    //         totalResults: 0
    //     }
        document.title= `${capitaliseFirstLetter(props.category)}- NewsGroup`; 
    
    // async updateNews(){
        const updateNews= async()=>{
        props.setProgress(10); //this.
        const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fc9a4f74afec4d7f9f7e26322057f015&page=${page}&pageSize=${props.pageSize}`; //this.state.page
        // this.setState({loading: true});
        setLoading(true);
        let data= await fetch(url);
        props.setProgress(30);
        let parsedData= await data.json();
        props.setProgress(70);
        console.log(parsedData);
        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setLoading(false);
        // this.setState({articles: parsedData.articles, 
        // totalResults: parsedData.totalResults,
        // loading: false, })  
        props.setProgress(100);
    }

    useEffect(()=>{
        updateNews();
    }, [])

    // async componentDidMount(){
        // console.log("cdm");
        // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fc9a4f74afec4d7f9f7e26322057f015&pageSize=${props.pageSize}`;
        // this.setState({loading: true});
        // let data= await fetch(url);
        // let parsedData= await data.json();
        // console.log(parsedData);
        // this.setState({articles: parsedData.articles, 
        // totalResults: parsedData.totalResults,
        // loading: false })  
        // this.updateNews();
    // }

    const fetchMoreData = async () => {  
        // this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fc9a4f74afec4d7f9f7e26322057f015&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
        // this.setState({
        //     articles: this.state.articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults
        // })
      };

    const handlePreviousClick= async ()=>{
        // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fc9a4f74afec4d7f9f7e26322057f015&page=${this.state.page -1}&pageSize=${props.pageSize}`;
        // this.setState({loading: true});
        // let data= await fetch(url);
        // let parsedData= await data.json();
        // console.log(parsedData);

        // this.setState({
        //     page: this.state.page -1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        // this.setState({page: this.state.page -1});
        setPage(page-1);
        updateNews();    
    }

    const handleNextClick= async ()=>{
        
        // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fc9a4f74afec4d7f9f7e26322057f015&page=${this.state.page +1}&pageSize=${props.pageSize}`;
        // this.setState({loading: true});
        // let data= await fetch(url);
        // let parsedData= await data.json();
        // console.log(parsedData);

        // this.setState({
        //     page: this.state.page +1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        // this.setState({page: this.state.page +1});
        setPage(page+1);
        updateNews();
    }

//   render() {
    
 return (
    <>
      {/* <div className="container my-3"> */}
        <h1 className="text-center" style= {{margin: '35px 0px', marginTop: '90px'}} >NewsGroup- Top {capitaliseFirstLetter(props.category)} Headlines</h1>

        {loading && <Spinner/>}
      <InfiniteScroll                      
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
      > 
            <div className="container">
            <div className="row">
            {/* {!this.state.loading && this.state.articles.map((element)   =>{ */}
            {articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                <NewsItem  title={element.title?element.title:""}   description={element.description?element.description.slice(0,90):""} imageUrl={!element.urlToImage?"https://media.istockphoto.com/id/879308898/vector/news-broadcast-background-breaking-news-vector-channel-graphic-concept-for-tv-breaking-news.jpg?s=612x612&w=0&k=20&c=bRkGqzgoFWp5ACHP75wK88LwZAL-HKmGvILJJPn19a4=":element.urlToImage}     newsUrl={element.url} author={element.author} date= {element.publishedAt} source={element.source.name}/>
                </div>
            }) }     
            </div> 
            {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button"     className="btn btn-dark" onClick={this.handlePreviousClick}> &  larr; Previous</button>
            <button disabled={this.state.page +1 > Math.ceil(this.state.    totalResults/props.pageSize)} type="button"    className="btn btn-dark" onClick={this.handleNextClick}>Next & rarr;</button>
            </div>  */}
            </div>
      </InfiniteScroll>
    </>
    )
  } 
    

News.defaulProps={
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News