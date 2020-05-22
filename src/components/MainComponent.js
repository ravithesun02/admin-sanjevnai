import React ,{Component} from 'react';
import AdminMap from './MapComponent';
import Login from './Login/LoginComponent';
import {Switch,Route,Link,withRouter} from 'react-router-dom';



class Main extends Component{

    render()
    {
        return (
            <div>
                <Switch>
                <Route exact path="/admin" component={()=><AdminMap/>}/>
                    <Route exact path="/" component={Login}/>
                   

                </Switch>
            </div>
        )
    }

}

export default withRouter(Main);