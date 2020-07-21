import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import LoginPage from '../pages/loginReg/Login'

const { Footer } = Layout;

const UnAuthLayout = () => (
    <Layout>
        {/*<Header>Header</Header>*/}
        {/*<Content>Content</Content>*/}
        {/*
         Imagine this could be a general layout for all unauthorized pages like
         the login page, forgot password, email-verified, etc...

         For this example project, we'll just have a Login Page
         */}
        <Switch>
            <Route path="/auth/login" component={LoginPage} />
            <Redirect to="/auth/login" />
        </Switch>
        <Footer style={{ textAlign: 'center' }}>
            Design ©2020 Created by Wu's UED
        </Footer>
    </Layout>
)

export default UnAuthLayout