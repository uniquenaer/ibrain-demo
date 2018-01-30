/**
 * Created by wangna on 2017/3/24.
 */
import { Tag } from 'antd';
import React from 'react';

export const studentColumns = [{
    title: '昵称',
    dataIndex: 'nickname',
    width: '20%',
}, {
    title: '手机',
    dataIndex: 'tel',
    width: '20%',
}, {
    title: '邮箱',
    dataIndex: 'email',
    width: '30%',
}, {
    title: 'Github',
    dataIndex: 'github_name',
}, {
    title: '管理员',
    dataIndex: 'is_admin',
    render: (isAdmin) => {
        if (isAdmin) return <Tag color="pink">管理员</Tag>;
        return <Tag color="blue">非管理员</Tag>;
    },
}, {
    title: '操作',
    dataIndex: 'action',
}];
