import React, { Component } from 'react';
// show loading  time: (new Date()).getTime(),isLoading: true,justTitle:true,hide: false,duration: null,type: 'process'
// hide loading when it's running time: (new Date()).getTime(),isLoading: false,justTitle:true,hide: false,duration: null,type: 'success'
// show loading and hide after time  time: (new Date()).getTime(),isLoading: true,justTitle:false,hide: true,duration: 5000,type: 'error'

class Toast extends Component {
    constructor(props){
        super(props);
        this.state = {
            qbs: props.qbs,
            open: props.open,title: props.title,message: props.message,type: props.type,hide: props.hide,justTitle: props.justTitle,duration: props.duration,
            classList: '',lastTime: null,lastTimeClose: '',
            titleStyle: props.titleStyle,msgStyle: props.msgStyle,iconColor: props.iconColor,style: props.style,contentStyle: props.contentStyle,contentClass: props.contentClass,
        };
    }

    static getDerivedStateFromProps(nextProps,prevState){

        if(prevState.qbs !== nextProps.qbs){
            // console.log('not equal ')
            if(nextProps.open){
                // console.log('open... ', )
                return {
                    qbs: nextProps.qbs,
                    open: true,title: nextProps.title,message: nextProps.message,type: nextProps.type,
                    justTitle: !nextProps.message,
                    classList: `fadein ${nextProps.className ? nextProps.className : ''}`, lastTime: new Date().getTime(),
                    hide: nextProps.hide === undefined ? true : nextProps.hide,
                    duration: nextProps.duration ? nextProps.duration : 4000,
                    titleStyle: nextProps.titleStyle,msgStyle: nextProps.msgStyle,iconColor: nextProps.iconColor,style: nextProps.style
                }
            }
            if(!nextProps.open ){
                // console.log('closing...',)
                return {
                    qbs: nextProps.qbs,
                    title: nextProps.title,message: nextProps.message,type: nextProps.type,
                    justTitle: !nextProps.message,
                    classList: `fadeout ${nextProps.className ? nextProps.className : ''}`, lastTimeClose:new Date().getTime(),hide: false,
                    titleStyle: nextProps.titleStyle,msgStyle: nextProps.msgStyle,iconColor: nextProps.iconColor,style: nextProps.style
                }
            }
        }
        return  {}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props.qbs !== prevProps.qbs ){
            if(this.props.open){
                // console.log('autoHide comDidUpdate')
                // console.log('this.props.qbs: ', this.props.qbs,'prevProps.qbs:', this.state.qbs)

                this.autoHide(this.state.duration)
            }
            if(!this.props.open){
                // console.log('closssing didupdate')
                const duration = this.state.type === 'error' ? 4500 : 1200;
                setTimeout(()=>{
                    let eventTime = (new Date()).getTime();
                    let timeDiff = eventTime - this.state.lastTime;
                    // console.log(timeDiff,'final loading close')
                    if(timeDiff >= duration){
                        this.setState({open: false});
                        this.props.onClose();
                    }
                },duration)
            }

        }
    }

    autoHide = (delay,qbs) =>{
        // alert('called')
        // console.log('autoHide fun called')

        setTimeout(()=>{

            let eventTime = (new Date()).getTime();
            let timeDiff = eventTime - this.state.lastTime;
            // console.log(timeDiff, 'timeDiff')
            // console.log(timeDiff, 'timeDiff = eventTime - this.state.lastTime =',timeDiff)
            // console.log(delay,'delay')
            // console.log(eventTime,'eventTime')
            // console.log(this.state.lastTime,'this.state.lastTime')
            // console.log(timeDiff >= delay,'timeDiff >= delay')


            if(delay && timeDiff > delay && this.props.hide && this.props.open){
                // alert('will be hide')
                this.setState({classList: 'fadeOutFast',hide:false},()=>{
                    setTimeout(()=>{
                        // console.log('called')
                        // alert('open: false')
                        this.setState({open: false});
                        this.props.onClose();
                    },600)
                })
            }
        },delay)


    };
    render(){

        return (this.state.open &&
            <div id={'reactjs-snackbar'} className={this.state.type}>

                <div className={'mainLoadingDiv '+this.state.classList} style={this.state.style}>

                    <div className="f-modal-alert">

                        {this.state.type === 'process' && <div className="lds-ring">
                            <div style={{borderColor: `${this.state.iconColor} transparent transparent transparent`}}/>
                            <div style={{borderColor: `${this.state.iconColor} transparent transparent transparent`}}/>
                            <div style={{borderColor: `${this.state.iconColor} transparent transparent transparent`}}/>
                            <div style={{borderColor: `${this.state.iconColor} transparent transparent transparent`}} />
                        </div>}
                        {this.state.type === 'error' && <div className="f-modal-icon f-modal-error animate">
                            <span className="f-modal-x-mark">
                                <span className="f-modal-line f-modal-left animateXLeft" style={this.state.iconColor ? {backgroundColor: this.state.iconColor} : {}}/>
                                <span className="f-modal-line f-modal-right animateXRight" style={this.state.iconColor ? {backgroundColor: this.state.iconColor} : {}}/>
                            </span>
                            <div className="f-modal-placeholder" style={this.state.iconColor ? {borderColor: this.state.iconColor} : {}}/>
                            <div className="f-modal-fix"/>
                        </div>}
                        {/*{this.state.type === 'warning' &&  <div className="f-modal-icon f-modal-warning scaleWarning">*/}
                        {/*<span className="f-modal-body pulseWarningIns"/>*/}
                        {/*<span className="f-modal-dot pulseWarningIns"/>*/}
                        {/*</div>}*/}
                        {this.state.type === 'success' && <div className="f-modal-icon f-modal-success animate" >
                            <span className="f-modal-line f-modal-tip animateSuccessTip" style={this.state.iconColor ? {backgroundColor: this.state.iconColor} : {}}/>
                            <span className="f-modal-line f-modal-long animateSuccessLong" style={this.state.iconColor ? {backgroundColor: this.state.iconColor} : {}}/>
                            <div className="f-modal-placeholder" style={this.state.iconColor ? {borderColor: this.state.iconColor} : {}}/>
                            <div className="f-modal-fix"/>
                        </div>}
                    </div>

                    {this.state.justTitle ? <div className={`loadingDiv ${this.state.contentClass ? this.state.contentClass : ''}`} style={this.state.contentStyle}>
                            <h1 className={'loadingText'} style={this.state.titleStyle}>{this.state.title}</h1>
                        </div>
                        : <div className={`loadingDiv ${this.state.contentClass ? this.state.contentClass : ''}`} style={this.state.contentStyle}>
                            <p style={this.state.titleStyle}>{this.state.title}</p>
                            <p style={this.state.msgStyle}>{this.state.message}</p>
                        </div>}

                </div>
            </div>

        )}
}

export default Toast;