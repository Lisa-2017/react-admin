import React, {Component} from 'react'
import  widthCheckLogin from  '@conts/width-check-login';

import BasicLayout from '../basic-layout'

@widthCheckLogin
class Home extends Component {
    render() {
        return (
            <div>
                Home

            </div>
        )
    }
}

export default Home