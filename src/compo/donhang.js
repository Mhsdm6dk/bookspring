import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function Donhang(props){
    const username=useSelector(state=>state.user.username);
    const [userlist,setUserlist]= useState([]);
    useEffect(()=>{
        fetch('https://book-app-vip.herokuapp.com/api/customer/show')
        .then(item=>item.json())
        .then(item=>{
           return item.filter((item)=>item.username==username);
        })
        .then(item=>{
            setUserlist(item[0].oder);
        })
    },[])
    if (userlist.length>0){
        return<div className="quanlidonhang">
        <div className="quanlidonhang__head">
                <h3 style={{margin:"20px 630px 0px 20px"}}>Danh sách đơn hàng</h3>
                <p className="them 2" onClick={props.thoatform}>Đóng</p>
        </div>
        <div className="quanlidonhang__body">
            {
                    <div className="quanlidonhang__body-list" >
                         <Order orderlist={userlist} />
                    </div>
    
            }
        </div>
    </div>
    }
    else{
        return<div className="quanlidonhang">
        <div className="quanlidonhang__head">
                <h3 style={{margin:"20px 630px 0px 20px"}}>Danh sách đơn hàng</h3>
                <p className="them 2" onClick={props.thoatform}>Đóng</p>
        </div>
        <div className="quanlidonhang__body">
                    
                         Chưa có đơn hàng nào
            
        </div>
    </div>
    }
    
}
function Order(props){
    const [kho,setKho]=useState(props.orderlist);
   const xoaOrder=(u)=>{
       fetch('https://book-app-vip.herokuapp.com/api/oder/delete/code='+u.target.value,{
           method:"DELETE",
           headers:{
               'Content-Type':'application/json'
           }
       })
       setKho(props.orderlist.filter((item)=>item.code!=u.target.value))
   }
    return<div >
        {kho.map((item)=>{
            return<div className="quanlidonhang__body-list-order" >
                Mã đơn hàng:{item.code}<br/>
                Thời gian tạo:{item.creatDate}<button className="list-order-button" value={item.code} onClick={xoaOrder}>Xóa</button><br/>
                Tổng số tiền:{item.cost}<br/>
                <Donhang2 list={item.oder_itemEntityCollection}/>
                </div>
        })}
    </div>
}
function Donhang2(props){
    const [itemlist,setItemlist]= useState(props.list);
    if(itemlist.length>0){
        return<>
        {itemlist.map((item)=>{
            if(item.item!=null){
                return <table>
            <tr>
                <td rowSpan="2"><img className="giohang__sach" src={item.item.image}></img></td>
                <td>Tên:{" "+item.item.name}</td>
            </tr>
            <tr>
            <td>Giá:{" "+item.item.price}</td>
            </tr>
            <tr>
            <td>Số lượng:{" "+item.quantity}</td>
            </tr>
            
        </table>
            }
        })}
    </>
    }
    else return null;
    
}