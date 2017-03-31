import * as React from 'react';

interface IProps{

}

interface IState{

}

export class Footer extends React.Component<IProps, IState>{
    render(){
        return(
            <div>
                <div className="copyrights">
                    <div className="container">
                        <div className="one_half"><span>Copyright © 2014 l yourdomain.com. All rights reserved.</span></div>
                        <div className="one_half last">
                            <ul className="social_icons">
                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                                <li><a href="#"><i className="fa fa-wordpress"></i></a></li>
                                <li><a href="#"><i className="fa fa-android"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <a href="#" className="scrollup"></a>
            </div>
        )
    }
}