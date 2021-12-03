import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Displaybook from "./displaybook";
export default function Bookshow(props){
    
    const timkiem=useSelector(state=>state.timkiem);
    const [kho, thaydoikho]= useState([]);
    useEffect(()=>{
        fetch("https://book-app-vip.herokuapp.com/api/category/show")
    .then(item=>item.json())
    .then(item=>{
        return item.filter((item)=>item.name==props.category_name);
    })
    .then(item=>{
        if (item.itemEntities!=null) {
            thaydoikho(item[0].itemEntities)
        }
    })
},[props.category_name])
    const them=(item)=>{
        const u={
            ten: kho[item.target.id].name,
            gia: kho[item.target.id].price,
            image: kho[item.target.id].image,
            id: kho[item.target.id].id
        }
        props.themvagiohang(u);
    }
    const items=kho.filter((item)=>item.name.toUpperCase().includes(timkiem.toUpperCase()));
    if(timkiem==''){
        return <Displaybook kho={kho} them={them}/>
    }
    else{
        return <Displaybook kho={items} them={them}/>
    }
        
 }
