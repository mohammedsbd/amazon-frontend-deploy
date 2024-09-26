import React from 'react'
import "./category.css"
import { Link } from 'react-router-dom';

const CategoryCard = ({data}) => {
  console.log(data);
  return (
    <div className="category">
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data?.title}</h2>
        </span>
        <img src={data?.imgLink} alt="" />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
