import React, { useReducer } from "react";
import ItemContext from "./ItemContext";
import ItemReducer from './ItemReducer'
import * as types from "../types";
import axios from "axios";
const ItemState = (props) => {
  const initialState = {
    batteries: null,
    loading: false,
    error: null,
    battery:null,
    admin:false,
    current:null,
    enquiry:null,
    comments:null
  };

  const [state, dispatch] = useReducer(ItemReducer, initialState);

  //get all batteries
  const getAllBatteries = async () => {
    try {
      const res = await axios.get("/battery");

      dispatch({
        type: types.GET_BATTERIES,
        payload: res.data,
      });

    } catch (error) {}
  };

  //get battery by id
  const getBatteryById =  async(id) =>{
      
        setLoading()
        const res=await axios.get(`/battery/${id}`)

        dispatch({
            type:types.GET_BATTERY_BY_ID,
            payload:res.data
        })
        clearLoading()

      
  }

  //add battery
  const addBattery =async (formdata) =>{
    try {
      
      const res=await axios.post("/battery",formdata) 
      dispatch({
        type:types.ADD_BATTERY,
        payload:res.data
      })
    } catch (error) {
      
    }
  }

  
  const deleteBattery = async(id) =>{
    try {
      await axios.delete(`/battery/${id}`)
      dispatch({
        type:types.DELETE_BATTERY,
        payload:id
      })
    } catch (error) {
      
    }
  }
  const updateBattery = async(values) =>{
    // console.log(values.id)
    
    try {
      const res=await axios.put(`/battery/${values.id}`,values)
      dispatch({
        type:types.UPDATE_BATTERY,
        payload:res.data
      })
    } catch (error) {
      
    }
  }
  //login admin
  const adminLogin =(values) =>{
    if(values.username==="admin"&&values.password==="admin"){
      localStorage.setItem("admin",true)
      dispatch({
        type:types.ADMIN_LOGIN,
        payload:true
      })
    }
    else{
      localStorage.removeItem("admin")
      dispatch({
        type:types.LOGIN_ERROR,
        payload:"Invalid username or password"
      })
    }
  }
  //logout
  const logout =() =>{
    localStorage.removeItem("admin")
    dispatch({type:types.ADMIN_LOGIN,payload:false})
  }

  //getloginstatus
  const getLoginStatus=()=>{
    if(localStorage.getItem("admin")==="true"){
      console.log(localStorage.getItem("admin")==="true")
      dispatch({type:types.ADMIN_LOGIN,payload:true})
    }
    else{
      dispatch({type:types.ADMIN_LOGIN,payload:false})
    }
  }

  //set loading
  const setLoading = () => dispatch({type:types.SET_LOADING})

  const clearLoading=()=>dispatch({type:types.CLEAR_LOADING})


  //set cuureent
  const setCurrent = (value) =>{
    setLoading()
    dispatch({
      type:types.SET_CURRENT,
      payload:value
    })
    clearLoading()
    
  }

  const clearCurrent =() =>dispatch({type:types.CLEAR_CURRENT})

  const addEnquiry=async(values)=>{
    await axios.post("/enquiry",values);
  }

  const fetchEnquiry= async() =>{
try {
  const res=await axios.get("/enquiry");
  dispatch({
    type:types.FETCH_ENQUIRY,
    payload:res.data
  })
} catch (error) {
  
}


  }
  const deleteEnquiry =async(id)=>{
    try {
      await axios.delete(`/enquiry/${id}`);
      dispatch({
        type:types.DELETE_ENQUIRY,
        payload:id
      })
    } catch (error) {
      
    }
  }

  const postComment =async(value)=>{

    console.log(value)
   const res=await axios.post("/comments",value);
   console.log(res)
    dispatch({
      type:types.POST_COMMENT,
      payload:res.data
    })


  }

  const deleteComment =async(id)=>{
    try {
      await axios.delete(`/comments/${id}`);
      dispatch({
        type:types.DELETE_COMMENT,
        payload:id
      })
    } catch (error) {
      
    }
  }

  const fetchComment =async(id)=>{
    const res=await axios.get("/comments")
    // var comments=res.data;
    // var newComment=[]
    // comments.forEach(element => {
    //   // console.log(res)
    //   if(element.batteryId==id)
    //   newComment.push(element)
    // });
    // console.log(newComment)
    dispatch({
      type:types.FETCH_COMMENT,
      payload:res.data,
      id:id
    })
  }

  

  return (
    <ItemContext.Provider
      value={{
        batteries: state.batteries,
        loading: state.loading,
        error: state.error,
        battery:state.battery,
        admin:state.admin,
        current:state.current,
        enquiry:state.enquiry,
        comments:state.comments,
        getAllBatteries,
        getBatteryById,
        setLoading,
        addBattery,
        adminLogin,
        logout,
        getLoginStatus,
        deleteBattery,
        updateBattery,
        setCurrent,
        clearCurrent,
        addEnquiry,
        deleteEnquiry,
        fetchEnquiry,
        postComment,
        deleteComment,
        fetchComment,
        clearLoading
    
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
