import React,{ useState} from "react";
import Setgiohang from './setgiohang';
import '../../App.css';
import giohang from '../../image/giohang.svg';
import { useSelector } from "react-redux";
 export default function Giohang(props){
     const user=useSelector(state=>state.user);
     const [state, setState]= useState({
         displayThanhtoan:false
     });
     const thanhtoan=()=>{
         document.getElementById("formgiohang").style.display="none";
        if(user.username==""){
            alert('Bạn phải đăng nhập để thanh toán!');
        }
        else{
            setState({
                displayThanhtoan:true
            });
        }
     }
     const thoatform=()=>{
         props.thoatform();
         props.setOpengiohang(false);
     }
     var tong=0,soluong=0;
     for(var i of props.giohang){
         tong=tong+i.gia*i.soluong;
         soluong=soluong+i.soluong;
     }
    if(props.giohang.length==0){

        return<> 
        <div className="form__inputform" id="formgiohang" >
                <div style={{display:"inline-flex"}}>
                <h3 className="giohang_title">Giỏ hàng</h3>
                <span><button className='dong' onClick={thoatform}>Đóng</button></span>
                </div>
                <p style={{marginLeft:"12px"}}>Chưa có sản phẩm nào trong giỏ hàng</p>
        <img src={giohang} style={{marginLeft:"75px"}}></img>
        <button className="form__inputform-button2" style={{marginLeft:"75px" ,marginBottom:"30px"}} onClick={thoatform}>Tiếp tục mua sắm</button>
                
        </div>
        </>
    }
    else return <>
            <div className="form__inputform" id="formgiohang" style={{height:"350px"}}>
                <div style={{display:"inline-flex"}}>
                <h3 className="giohang_title">Giỏ hàng</h3>
                <span><button className='dong' onClick={thoatform}>Đóng</button></span>
                </div>
                <div style={{overflow:"auto",height:"170px"}}>
                {   
                    props.giohang.map((u)=>{
                    return <Setgiohang ten={u.ten} gia={u.gia} image={u.image} soluong={u.soluong} xoabot={props.xoabot} xoa={props.xoa} themvagiohang={props.themvagiohang}/>
                    })
    
            }
                </div>
            
                <p style={{marginLeft:"30px"}}>Thành tiền: {tong+" Đ"}</p>
                <button className="form__inputform-button2" style={{marginLeft:"75px" ,marginBottom:"30px"}} onClick={thanhtoan}>Thanh toán</button>
                </div>
                {state.displayThanhtoan && <Thanhtoan clear={props.clear} user={user} giohang={props.giohang} cost={tong} soluong={soluong} thoatform={thoatform}/>}
            </>      
}
function Thanhtoan(props) {
    const user=props.user;
    const [state,setState]= useState({
        name:"",
        email:"",
        address:"",
        telephone:""
    });
    const y=user.username+Math.random().toString();
    const dathang=()=>{
        const u={
            name: state.name,
            email: state.email,
            address: state.address,
            telephone: state.telephone,
            id:user.id,
            username: user.username
        }
        
        fetch('https://book-app-vip.herokuapp.com/api/customer/update',{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(u),
            redirect: 'follow'
        })
        fetch("https://book-app-vip.herokuapp.com/api/oder/create",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "customerId":user.id,
                "cost":props.cost,
                "code": y,
                "total_product":props.soluong
            })
            })
            .then(u=>{
                props.giohang.map((item)=>{
                    fetch("https://book-app-vip.herokuapp.com/api/manages/create",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "itemId":item.id,
                    "quantity":item.soluong,
                    "code": y
                })
                })
                })
            })
            
        
        alert("Đặt hàng thành công!");
        props.clear();
        props.thoatform();
    }
    const handleForm=(item)=>{
        setState({...state,[item.target.name]:item.target.value})
    }
    return<div className="formthanhtoan" id="formdathang" style={{top:"70px"}}>
        <table style={{marginLeft:"20px"}}>
        <tr><td colSpan="2"><h3>Thông tin người nhận</h3></td></tr>
        <tr><td>Họ tên người nhận</td><td><input type="text" name="name" value={state.name} className="thanhtoan__inputtext" onChange={handleForm}></input></td></tr>
        <tr><td>Emai</td><td><input type="email" name="email" value={state.email} onChange={handleForm} className="thanhtoan__inputtext"></input></td></tr>
        <tr><td>Số điện thoại</td><td><input type="text" name="telephone" onChange={handleForm} value={state.telephone} className="thanhtoan__inputtext" ></input></td></tr>
        <tr><td>Quốc gia</td><td><select className="thanhtoan__inputtext" style={{width:"457px"}}>
                        <option>Việt Nam</option>
                        <option>Tiểu vương quốc PTIT</option>
                        <option>Thái Lan</option>
                        <option>Trung Quốc</option>
                    </select></td></tr>
        <tr><td>Địa nhận hàng</td><td><input type="text" name="address" value={state.address} onChange={handleForm} className="thanhtoan__inputtext"></input></td></tr>
        <tr><td>Ghi chú</td><td><textarea className="thanhtoan__inputtext" style={{height:"70px"}} placeholder="Các thông tin như giờ nhận, số nhà cụ thể,...">  
        </textarea></td> </tr> 
        </table>
        <button className="form__inputform-button2" style={{marginLeft:"275px" ,marginBottom:"30px"}} onClick={dathang} >Đặt hàng</button>
    </div>  
} 