import React, { useEffect, useState } from "react";
export default function Quanlydonhang(props){
    const [userlist,setUserlist]= useState([]);
    useEffect(()=>{
        fetch('https://book-app-vip.herokuapp.com/api/customer/show')
        .then(item=>item.json())
        .then(item=>{
            setUserlist(item.filter((item)=>item.oder.length>0));
        })
    },[])
    return<div className="quanlidonhang">
        <div className="quanlidonhang__head">
                <h3 style={{margin:"20px 630px 0px 20px"}}>Danh sách đơn hàng</h3>
                <p className="them 2" onClick={props.thoat}>Đóng</p>
        </div>
        <div className="quanlidonhang__body">
            {
                userlist.map((item)=>{
                    return<div className="quanlidonhang__body-list" >
                        <p>
                        Name:{" "+item.name}<br/>
                        Địa chỉ:{" "+item.address}<br/>
                        SĐT:{" "+item.telephone}<br/>
                        Email:{" "+item.email}<br/>
                        </p>
                         <Order orderlist={item.oder} />
                    </div>
                })
            }
        </div>
    </div>
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
                <Donhang code={item.code}/>
                </div>
        })}
    </div>
}
function Donhang(props){
    const [itemlist,setItemlist]= useState([]);
    useEffect(()=>{
        fetch('https://book-app-vip.herokuapp.com/api/oder/show')
        .then(item=>item.json())
        .then(item=>{
            return item.filter((item)=>( item.code==props.code))
        })
        .then(item=>{
            setItemlist(item[0].oder_itemEntityCollection);
        })
    },[props.code])
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