/**
 * Created by zhuzi on 10/4/2017.
 * 流程可能有变动, disabled function
 */

import React, { PureComponent } from 'react';
import Papa from 'papaparse';
// eslint-disable-next-line
import { Button, Icon, message, Modal, Tag } from 'antd';
import uploadCardTemplate from './uploadCardTemplate.csv';

Papa.parsePromise = file => new Promise((resolve, reject) => {
    Papa.parse(file, {
        header: true,
        complete: resolve,
        error: reject,
    });
});

export default class UploadCards extends PureComponent {
    state = {
        visible: false,
        file: null
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    ensureUpload = (e) => {
        const { file } = this.state;
        if (!file) {
            message.error('请上传文件');
            return;
        }

        this.setState({
            visible: false,
        });

        Papa.parsePromise(this.state.file)
            .then((results) => {
                if (results.data) {
                    const cardList = results.data.filter((card, index) => {
                        return Object.keys(card).every(key => card[key])
                    });
                    this.props.addCardsBatch(cardList);
                    this.clearFiles();
                }
            })
            .catch(err => console.log(err));
    };
    cancelUpload = (e) => {
        this.setState({
            visible: false,
        }, () => {
            this.clearFiles()
        });
    };

    clearFiles = () => {
        this.setState({
            file: null
        });
        this.file.value = '';
    };

    onUploadFile = (e) => {
        const file = e.target.files && e.target.files[0];
        let fileType;
        if (file) {
            fileType = file.type; // text/csv
        }
        if (fileType !== 'text/csv') {
            message.error('请上传 csv 格式文件');
            return;
        }
        this.setState({
            file
        });
    };


    render() {
        return (
            <div style={{ display: 'inline-block', margin: '10px', verticalAlign: 'middle' }}>
                <Button.Group>
                    <Button style={{ verticalAlign: 'top' }}>
                        <a href={uploadCardTemplate} download="卡包导入模板.csv" style={{ display: 'block' }}>
                            <Icon type="download" />下载批量导入 csv 模板
                        </a>
                    </Button>
                    <Button style={{ verticalAlign: 'top' }} onClick={this.showModal}>
                        <Icon type="upload" />上传
                    </Button>
                </Button.Group>
                <Modal
                    title="上传"
                    visible={this.state.visible}
                    onOk={this.ensureUpload}
                    onCancel={this.cancelUpload}
                    cancelText={'取消'}
                    okText={'确认'}
                >
                    <input
                        type="file" id="uploadFile"
                        onChange={this.onUploadFile}
                        accept=".csv"
                        style={{ display: 'none' }}
                        ref={ref => this.file = ref} />
                    <label htmlFor="uploadFile"
                           className="ant-btn"
                           style={{ lineHeight: '32px', marginRight: '20px' }}>
                        <Icon type="upload" />上传 csv</label>
                    {this.state.file ?
                        <Tag color="magenta"
                             closable
                             onClose={this.clearFiles}
                             style={{ height: '32px', lineHeight: '32px', verticalAlign: 'top' }}><Icon
                            type="paper-clip" /> {this.state.file.name}
                        </Tag> : null}
                </Modal>
            </div>
        );
    }
}
