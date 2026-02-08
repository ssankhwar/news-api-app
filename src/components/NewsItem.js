import React from 'react'
import altImage from './resources/alterImage.jpg';

const NewsItem = (props)=> {
    let {title, description, imageUrl, author, date, source} = props;
    return (
      <div  className='container my-3'>
       <div className="card">
        <div style={{display:"flex",justifyContent:"flex-end",position: "absolute", right: "0"}}>
        <span className="badge  rounded-pill bg-danger">{source}</span> 
      </div>
       <img src={!imageUrl? altImage: imageUrl} 
       className="card-img-top" alt="..."/>
    <div className="card-body">
    <h5 className="card-title">{title}  </h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-body-secondary">By {!author? "Unknown":author} on {date}</small></p>
    <a href={props.keyId} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more...</a>
  </div>
</div>
      </div>
    )
}

export default NewsItem;
