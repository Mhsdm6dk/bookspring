import React,{ useEffect, useState} from "react";
import './admin.css';
export default function Boxitem(props){
    const [state,setState]=useState({price:props.u.price,inventory:props.u.inventory});
    useEffect(()=>{
        setState({price:props.u.price,inventory:props.u.inventory});
    },[props.u])
    const handleItem=(item)=>{
        setState({...state,[item.target.name]:item.target.value});
    }
    const suaitem=()=>{
        fetch('https://book-app-vip.herokuapp.com/api/item/update',{
            method:"PUT",
                headers:{
                    'Content-Type': 'application/json'
                  },
            body:JSON.stringify({
                "id":props.u.id,
                "name":props.u.name,
                "image":props.u.image,
                "price":state.price,
                "describes":props.u.describes,
                "inventory":state.inventory,
                "category_name":props.category_name
            }
            
            ),
            redirect: 'follow'
        })
        .then(alert("Thay đổi thông tin sản phẩm thành công"))
    }
    const xoaitem=()=>{
        fetch('https://book-app-vip.herokuapp.com/api/item/delete/id='+props.u.id,{
            method:"DELETE",
                headers:{
                    'Content-Type': 'application/json'
                  }
        })
        props.xoasanpham(props.u.id);
    }
    return <div className="body__itembook-item">
    <div className="body__itembook-item-box" style={{height:"300px",position:"relative"}}>
        <img className="body__itembook-item-image" src={props.u.image} alt="lol"></img>
        <br/>
        {props.u.name}
        <br/>
        <div style={{position:"absolute", bottom:"35px",right:"40px"}}>
        Giá:{" "}<input type="text" name="price" onChange={handleItem} value={state.price} style={{width:"50px"}}/>
        <br/>
        Số lượng:{" "}<input type="number" name="inventory" onChange={handleItem} value={state.inventory} style={{width:"30px"}}/>
        </div>
        <div >
            <button className="them them1" name={props.u.name} value={props.u.price} id={props.u.image} onClick={suaitem}>Thay đổi</button>
            <button className="them them2" name={props.u.name} value={props.u.price} id={props.u.image} onClick={xoaitem}>Xóa</button>
        </div>
    </div>
</div> 
}