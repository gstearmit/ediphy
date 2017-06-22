import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';

export default class MarksList extends Component {
    render() {
        return (
            /* jshint ignore: start */
            <div>
                <Button 
                    className='toolbarButton'
                    onClick={e => {
                        this.props.onRichMarksModalToggled();
                        e.stopPropagation();
                    }}>
                    Add mark
                </Button>
                <br/>
                {
                    Object.keys(this.props.state.__marks).map(id => {
                        let mark = this.props.state.__marks[id];
                        return (
                            <div style={{display:"block", backgroundColor: '#444', margin: '3px'}} key={id}>
                                <i className="material-icons marklist">room</i>
                                <span style={{marginLeft: "10px", verticalAlign: "super", width: "50px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>{mark.title}</span>
                                <span style={{fontSize:"10px", marginLeft: "15px", marginRight: "20px", verticalAlign:"super"}}>{mark.value}</span>
                                    <i className="material-icons marklist"
                                       onClick={() => {
                                            this.props.onRichMarkEditPressed(mark);
                                            this.props.onRichMarksModalToggled();
                                       }}>edit</i>
                                    <i className="material-icons marklist"
                                       onClick={() => {
                                            this.props.onRichMarkDeleted(id);
                                       }}>delete</i>
                            </div>
                        );
                    })
                }
            </div>
            /* jshint ignore: end */
        );
    }
}