import React from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import ToolbarFileProvider from '../../../_editor/components/external_provider/file_modal/APIProviders/common/ToolbarFileProvider';
import i18n from 'i18next';
/* eslint-disable react/prop-types */

export default class DataProvider extends React.Component {
    constructor(props) {
        super(props);
        let rows = this.props.data.length;
        let cols = this.props.data.length === 0 ? 2 : Object.keys(this.props.data[0]).length;
        this.confirmButton = this.confirmButton.bind(this);
        this.deleteCols = this.deleteCols.bind(this);
        this.colsChanged = this.colsChanged.bind(this);
        this.deleteRows = this.deleteRows.bind(this);
        this.rowsChanged = this.rowsChanged.bind(this);
        this.keyChanged = this.keyChanged.bind(this);
        this.dataChanged = this.dataChanged.bind(this);
        this.parseCSV = this.parseCSV.bind(this);

        this.state = {
            cols: cols,
            rows: rows,
            data: this.props.data,
            keys: this.props.keys,
            error: false,
        };
    }
    /**
     * TODO Revisar
     * */
    confirmButton() {
        let empty = false;
        if (typeof this.props.dataChanged === 'function' && !empty) {
            this.props.dataChanged({ data: this.state.data, keys: this.state.keys });
        }
    }
    deleteCols(col) {
        let cols = this.state.cols - 1;
        let keys = this.state.keys.slice();
        keys.splice(col, 1);
        let data = this.state.data.map(ele=>{
            let ele2 = ele.slice();
            ele2.splice(col, 1);
            return ele2;
        });

        this.setState({ cols: cols, keys: keys, data: data });
    }
    dataChanged(event) {
        let pos = event.target.name.split(" ");
        let row = pos[0];
        let col = pos[1];
        let data = this.state.data.slice();
        let newvalue = event.target.value === "" || event.target.value === null ? "" : event.target.value;
        data[row][col] = newvalue;
        this.setState({ data: data });
        // this.props.dataChanged(data)

    }
    colsChanged(event) {
        let pre = this.state.cols;
        let value = parseInt(event.target.value, 10);
        let keys = this.state.keys.slice();
        let data = this.state.data.slice();
        if(value > 1) {
            if (value > pre) {
                let difference = value - pre;
                keys = keys.concat(Array(difference).fill(""));
                data = data.map(ele=>{
                    return ele.concat(Array(difference).fill(""));
                });
            } else if (value < pre) {
                let difference = pre - value;
                keys.splice(value, difference);
                data = data.map(ele=>{
                    let ele2 = ele.slice();
                    ele2.splice(value, difference);
                    return ele2;
                });
            }

            this.setState({ keys: keys, data: data, cols: value });
        }
    }
    deleteRows(row) {
        let rows = this.state.rows - 1;
        let data = this.state.data.slice();
        data.splice(row, 1);
        this.setState({ rows: rows, data: data });
    }
    rowsChanged(event) {
        let pre = this.state.rows;
        let value = parseInt(event.target.value, 10);
        let cols = this.state.cols;
        let keys = this.state.keys.slice();
        let data = this.state.data.slice();

        if(value > 1) {
            if (value > pre) {
                let difference = value - pre;
                data = data.concat(Array(difference).fill(Array(cols).fill("")));
            } else if (value < pre) {
                data.splice(value, pre - value);
            }
            this.setState({ keys: keys, data: data, rows: value });
        }
    }
    keyChanged(event) {
        let pos = event.target.name;
        let keys = this.state.keys.slice();
        let newvalue = event.target.value === "" || event.target.value === null ? "" : event.target.value;
        keys[pos] = newvalue;
        this.setState({ keys: keys });
    }

    componentWillUnmount() {
        let empty = false;
        if (typeof this.props.dataChanged === 'function' && !empty) {
            this.props.dataChanged({ data: this.state.data, keys: this.state.keys, rows: this.state.rows });
        }
    }

    parseCSV(base64URI) {
        let base64File = base64URI.split('base64,')[1];
        let decodedArray = atob(base64File).split('\n');
        let keys = decodedArray[0].split(',');
        decodedArray.splice(0, 1);
        let data = decodedArray.map(row => {
            return row.split(',');
        });
        this.setState({ data: data, keys: keys, cols: keys.length, rows: decodedArray.length });
    }

    render() {
        let props = this.props.props;
        return (
            <div id="datatable_config_modal">
                { this.state.alert }
                <Form horizontal style={{ padding: "15px" }}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} xs={2}>
                            {i18n.t("DataTable.data_cols")}
                        </Col>
                        <Col xs={3}>
                            <FormControl type="number" name="cols" value={this.state.cols} onChange={this.colsChanged}/>
                        </Col>

                        <Col componentClass={ControlLabel} xs={1}>
                            {i18n.t("DataTable.data_rows")}
                        </Col>
                        <Col xs={3}>
                            <FormControl type="number" name="rows" value={this.state.rows} onChange={this.rowsChanged}/>
                        </Col>
                    </FormGroup>
                    <div style={{ marginTop: '10px', overflowX: 'auto' }}>
                        <div style={{ display: 'table', tableLayout: 'fixed', width: '100%' }}>
                            {Array.apply(0, Array(this.state.cols)).map((x, i) => {
                                return(
                                    <FormControl.Static key={i} style={{ display: 'table-cell', padding: '8px', textAlign: 'center' }} />
                                );
                            })}
                        </div>
                        <table className="table bordered hover" >
                            <thead>
                                <tr>
                                    {Array.apply(0, Array(this.state.cols)).map((x, i) => {
                                        return(
                                            <th key={i + 1}>
                                                <i className="material-icons clearCol" onClick={(e)=>{this.deleteCols(i);}}>clear</i>
                                                <FormControl key={"form_" + i} type="text" name={i} value={this.state.keys[i]} style={{ margin: '0px' }} onChange={this.keyChanged}/>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody style={{ backgroundColor: '#f2f2f2' }}>
                                {Array.apply(0, Array(this.state.rows)).map((x, i) => {

                                    return(
                                        <tr key={i + 1}>

                                            {Array.apply(0, Array(this.state.cols)).map((q, o) => {
                                                return(
                                                    <td key={o + 1}>
                                                        {o === 0 ? (<i className="material-icons clearRow" style={{ float: 'left' }} onClick={()=>{this.deleteRows(i);}}>clear</i>) : null}

                                                        <FormControl key={"ele_" + i + " " + o} type="text" style={{ width: '100%' }} name={i + " " + o} value={this.state.data[i][o] } onChange={this.dataChanged}/>

                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <FormGroup style={{ margin: "0", textAlign: "right" }}>
                        <ToolbarFileProvider
                            id={this.props.id}
                            openModal={props.openFileModal}
                            fileModalResult={props.fileModalResult}
                            onChange={ (target)=>{this.parseCSV(target.value);}}
                            accept={".csv"}
                            buttontext={i18n.t('importData')}
                        />
                    </FormGroup>
                </Form>
            </div>
        );
    }
}
/* eslint-enable react/prop-types */

