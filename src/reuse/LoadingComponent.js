import React ,{Component} from 'react';
import Loader from 'react-loader-spinner';

class Loading extends Component{
    render()
    {
        return(

            <div className="container-fluid">
            <div className="row d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
                
                <Loader 
                type='BallTriangle'
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000}
                />
            </div>
            

            </div>

        )
    }
}

export default Loading;