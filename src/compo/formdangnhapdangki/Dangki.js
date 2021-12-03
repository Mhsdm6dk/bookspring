
import React, { useState,useEffect } from "react";
import '../../App.css';
export default function Dangki(props){
    const [state,setState]= useState({
        username:"",
        password:"",
        nhaplaipassword:""
    });
    const [users,setNguoidung]=useState([]);
        useEffect(()=>{
            fetch('https://book-app-vip.herokuapp.com/api/customer/show?fbclid=IwAR3qod2TxWDDxCGU0UUx6ca7LcEB1aOtJsqe-EF-kqjfk0CN1L7lSs5-IlU')
            .then(user=>user.json())
            .then(user=>{
                setNguoidung(user);
            })
        },[])
    const getinfo=(item)=>{
        setState({...state, [item.target.name]:item.target.value});
    }   
    const dangki=()=>{
        var kt=0;
        for(var i of users){
            if(i.username==state.username){
                
                kt=1;
                break;
            }
        }
        if(state.password!=state.nhaplaipassword){
            alert("Nhập lại mật khẩu chưa đúng !");
        }
        else if(kt==1){
            alert("Tên đăng nhập này đã được đăng kí, vui lòng chọn tên khác !");
        }
        else{
            const u={
                "username": state.username,
                "password": state.password
            }
            fetch("https://book-app-vip.herokuapp.com/api/customer/create?fbclid=IwAR21JlPAhaAfjqwT6rbbVySYsT3_5MjuI3fAE0erbl1nGSTbWd3LchD_9OM",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify(u)
            })
            .then()
            alert("Tài khoản đăng kí thành công, vui lòng đăng nhập để mua hàng !");
            props.thoatform();
            props.display("Đăng nhập");
        }
    }
    const gotodangnhap=()=>{
        props.display("Đăng nhập");
    }
        return <div className="form__inputform" id="formdangki" >
            <div style={{margin:"0px 0px 20px 10px"}}>
                <div className="form__header">
                    <h3 >Đăng kí</h3>
                    <span className="form__header-link" onClick={gotodangnhap}>Đăng nhập</span>
                </div>
                <div className="spaceline">Tên đăng nhập:</div>
                    <input type="text" placeholder="Nhập tên đăng nhập" name="username" onChange={getinfo} className="form__inputform-text"></input>
                <div className="spaceline">Mật khẩu:</div>
                    <input type="password" onChange={getinfo} name="password" placeholder="*******" className="form__inputform-text"></input>
                <div className="spaceline">Nhập lại mật khẩu:</div>
                    <input type="password" onChange={getinfo} placeholder="*******" name="nhaplaipassword" className="form__inputform-text"></input>
                <button className="button__dangnhap form__inputform-button2" onClick={dangki}>Đăng kí</button>
                <button className="button__boqua form__inputform-button" onClick={props.thoatform}>Bỏ qua</button>
        </div>
    </div>
    }
