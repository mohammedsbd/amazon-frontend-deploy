import React from 'react'
import { categoryInfos } from "./catagoryFullinfos";
import CategoryCard from './CategoryCard'
import "./category.css"

const Category = () => {
  return (
    <section className="category__container">
      {categoryInfos.map((infos) => (
 <CategoryCard data ={infos} />
      ))
       
      
      }
    </section>
  );
}

export default Category
