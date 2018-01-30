/**
 * Created by zhuzi on 21/3/2017.
 */

import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { studentColumns } from './defaultColumns';

export default class CommonTable extends PureComponent {
    render() {
        return (
            <Table
                dataSource={this.props.dataSource}
                rowKey={row => row.id || row._id}
                columns={this.props.columns ? this.props.columns : studentColumns}
                pagination={{
                    showSizeChanger: true,
                    defaultPageSize: this.props.defaultPageSize,
                    pageSizeOptions: this.props.pageSizeOptions,
                    total: this.props.dataSource.length,
                    showTotal: total => `共计 ${total} `,
                }}
                onRow={(record, index) => (this.props.onRowClick ? this.props.onRowClick(record, index) : null)} />
        );
    }
}

