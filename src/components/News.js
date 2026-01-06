import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';

export class News extends Component {

  constructor(props){
    super(props);
    this.state = {
      articles : [],
      page : 1,
      loading : false
  }
  document.title = this.capitalize(this.props.category)
}

 capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1)
}

  async updatePage(){
  let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fc0a3d4ee559420b95796cd9a59a9b5e&page=${this.state.page}&pageSize=${this.props.pageSize}`);
    this.setState({
      loading : true
    })
    let parseData = await data.json();
    this.setState({
      articles : parseData.articles,
      loading : false
    })

   }
  async componentDidMount()
  {
   this.updatePage();
  }

    gotoNextPage =async ()=>{
      this.setState({
         page: this.state.page +1,
        })
        this.updatePage();
      }

   gotoPreviousPage =async ()=>{
    this.setState({
            page: this.state.page -1,
        })
        this.updatePage();
  }
 
  
  render() {
    

    return (
      <>
      <div className='container my-3'>
        <h2 className='text-center'>NewsMantra - Top Headlines</h2>
         {this.state.loading && <Loading/>}
        <div className="row">
          
          {!this.state.loading && this.state.articles.map((e)=>{
            return <div className="col-md-4" key={e.url}>
                <NewsItem title={e.title}  description={e.description} imageUrl={e.urlToImage} keyId={e.url} author={e.author} date={e.publishedAt}
                source={e.source.name} /> 
            </div>
          })
          }
        </div>
      </div>
      <div className='container d-flex justify-content-between my-3'>
        <button disabled={this.state.page <=1} className='btn btn-dark' onClick={this.gotoPreviousPage}> &#8592; Previous </button>
        <button disabled={this.state.page +1 > Math.floor(100/this.props.pageSize)} className='btn btn-dark' onClick={this.gotoNextPage}>Next &#x2192;</button>
        </div>
      </>
    )
  }
}

export default News
