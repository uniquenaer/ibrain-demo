/**
 * Created by wangna on 2018/1/29.
 */
import React from 'react';
import { Button, Popconfirm, Tooltip } from 'antd';
import EditableCell from './component/EditableCell';

export default function columns(onDelete, onCellChange) {
    return [
        {
            title: '展示地址',
            dataIndex: 'group_name',
            width: '10%',
            render: (text, record) => <a
                href={`${window.location.origin}/packs/${text}`}
                target="_blank">{text}</a>
        },
        {
            title: '卡包名称',
            dataIndex: 'pack_name',
            width: '20%',
            render: (text, record) => (<EditableCell
                type="input"
                value={text}
                onChange={(value) => {
                    onCellChange(record._id, { 'pack_name': value })
                }}
            />)
        },
        {
            title: '卡片标题',
            dataIndex: 'card_title',
            width: '15%',
            render: (text, record) => (<EditableCell
                type="input"
                value={text}
                onChange={(value) => {
                    onCellChange(record._id, { 'card_title': value })
                }}
            />)
        }, {
            title: '卡片内容',
            dataIndex: 'card_content',
            width: '30%',
            render: (text, record) => (<EditableCell
                type="textarea"
                value={text}
                onChange={(value) => {
                    onCellChange(record._id, { 'card_content': value })
                }}
            />)
        }, {
            title: '卡片类型',
            dataIndex: 'card_type',
            width: '10%',
            render: (text, record) => (<EditableCell
                value={text}
                type="select"
                optionsArr={["power", "exam", "video"]}
                onChange={(value) => {
                    onCellChange(record._id, { 'card_type': value })
                }}
            />)
        }, {
            title: '开放阅读时间',
            dataIndex: 'release_date',
            width: '10%',
            render: (text, record) => (<EditableCell
                type="DatePicker"
                value={text}
                onChange={(value) => {
                    onCellChange(record._id, { 'release_date': value })
                }}
            />)
        }, {
            title: '操作',
            dataIndex: 'action',
            width: '5%',
            render: (text, record) => (
                <Popconfirm
                    title={[<p key={0}>确定删除此卡片么?</p>]}
                    onConfirm={() => onDelete(record._id)}
                    placement="topRight">
                    <Button icon="delete" size="small" />
                </Popconfirm>
            ),
        }];
}