import React from 'react'
import { Tabs } from 'antd'

import './tabContent.scss'

const TabContent = () => {
    const { TabPane } = Tabs
    return (
        <div className='tab-content'>
            <Tabs defaultActiveKey="1">
                <TabPane tab="DASHBOARD" key="1">

                </TabPane>
                <TabPane tab="TEAMS" key="2">

                </TabPane>
                <TabPane tab="ANALYTICS" key="3">

                </TabPane>
                <TabPane tab="BILLING" key="4">

                </TabPane>
            </Tabs>
        </div>
    )
}

export default TabContent