import * as React from 'react';
import ReactMapGL, { Marker,FullscreenControl,NavigationControl, Popup } from 'react-map-gl';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import socketIOClient from "socket.io-client";
import { baseURL } from '../reuse/baseURL';
import CityPin from './city-pin';
import Modal from 'react-bootstrap/Modal';
import haversine from 'haversine';
import {GrLogout} from 'react-icons/gr';

toast.configure();

const Token="pk.eyJ1IjoicmF2aXRoZXN1bjAyIiwiYSI6ImNrYWV0NjZwNTIzcncyc210aTdmd3F4NGEifQ.vKkdifxbucOWaSKhgQj87g";

const fullscreenControlStyle = {
  position: "absolute",
  bottom: 7,
  right: 0,
  padding: "10px"
};

const navStyle = {
  position: "absolute",
  bottom: 43,
  right: 0,
  padding: "10px"
};

var isLoggedIn=false;
export default class AdminMap extends React.PureComponent  {

  constructor(props)
  {
    super(props);
    this.state={
      response:[],
      selected:'',
      viewport:{
        width: '100vw',
        height: '100vh',
        latitude: 0,
        longitude: 0,
        zoom: 10
      },
      userdata:[],
      dataSet:false,
      selectedLat:0,
      selectedLon:0
    }
  }


  setResponse(value)
  {
    this.setState({response:value});
  }

  setSelected=async(value,latitude,longitude)=>
  {
   await this.setState({selected:value,selectedLat:latitude,selectedLon:longitude});
    this.showPopUp();
  }

  setViewport(nextViewport)
  {
    this.setState({viewport:nextViewport});
  }

   componentDidMount()
   {

    const value=JSON.parse(localStorage.getItem('location'));
   
        console.log('called');
          if(value!==null)
           isLoggedIn=true;
          else
          {
              toast.error('You are not logged In',{position:toast.POSITION.TOP_CENTER});
              isLoggedIn=false;

              return;
              
          }

          this.setState({
            viewport:{
              ...this.state.viewport,
              latitude:value.latitude,
              longitude:value.longitude
            }
          })

          const socket=socketIOClient(baseURL,{
            extraHeaders: {
              'x-auth-token': localStorage.getItem('token')
            },
            transportOptions: {
              polling: {
                extraHeaders: {
                  'x-auth-token': localStorage.getItem('token')
                }
              }
            },
          });
          socket.on('FromAPI',data=>{
            console.log(data);
              this.setResponse(data);
          });

        }

    
showPopUp=async()=>{
  try
  {
      let res=await fetch(baseURL+`/users/detail/admin/${this.state.selected}`,{
        method:'GET',
        headers:{
          'Authorization':'Bearer '+localStorage.getItem('token')
        }
      });

      if(res.ok)
      {
        let user=await res.json();

        
        let userDATA=[];
        userDATA.push(user.user);
        console.log(user.user);

       await this.setState({userdata:user.user,dataSet:true});


      }
  }
  catch(error)
  {
    console.log(error);
    toast.error(error,{position:toast.POSITION.TOP_CENTER,autoClose:false});
  }
}

logout=()=>{
  localStorage.clear();
  isLoggedIn=false;
  toast.success('You are logged out !',{position:toast.POSITION.TOP_CENTER});

 
}


  
render()
{
 const  _renderMarker=this.state.response.map((loc,index)=>{
    return(
      <Marker
      key={index}
      longitude={loc.longitude}
      latitude={loc.latitude}
      >
        <CityPin size={20} onClick={() => this.setSelected(loc.googleId,loc.latitude,loc.longitude)} />

      </Marker>
    );
  });

  const _renderPop=this.state.userdata.map((item,index)=>{
    const start={
      latitude:this.state.selectedLat,
      longitude:this.state.selectedLon
    };
    const end={
      latitude:item.home_location.latitude,
      longitude:item.home_location.longitude
    };
    return (
      <Modal
      key={index}
      show={this.state.dataSet}
      onHide={()=>this.setState({dataSet:false,userdata:[],selected:'',selectedLat:0,selectedLon:0})}
      size='md'
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
           Details of {item.first_name+' '+item.last_name} 
          </Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
          <h4>Full Address</h4>
          <p>
            {item.address.full_add}
          </p>
          <h4>Mobile Number</h4>
          <p> {item.mobile} </p>
          <h4>Distance Covered</h4>
          <p> {haversine(start,end,{unit:'meter'})/1000} km </p>
        </Modal.Body>
  
      </Modal>
    )
  })

  if(!isLoggedIn)
  {
   return <Redirect to='/' />
  }

  else


  return (
      <div>
    <ReactMapGL
    mapboxApiAccessToken={Token}
    mapStyle="mapbox://styles/ravithesun02/ckaetmgaz1qn41io4ijnzi04f"
      {...this.state.viewport}
      onViewportChange={nextViewport => this.setViewport(nextViewport)}
    >
     {_renderMarker}

     <div className="fullscreen" style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
        <div style={{position:'absolute',top:10,left:10,zIndex:20}}>
          <img src='/images/app_icon.png' alt='app icon' height={50} width={50} />
        </div>
        <div className="logout" style={{position:'absolute',top:10,right:10,zIndex:20}}>
          <button style={{padding:'10px',backgroundColor:'white',borderRadius:'25px'}} onClick={()=>this.logout()} >
            <GrLogout size={22} />
          </button>
        </div>
    </ReactMapGL>
   {_renderPop}
    </div>
  );
}
}