import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Button,
} from '@shopify/polaris';
import React, { useState } from 'react';

export default function RegisterForm(props) {
  const { signup } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  return (
    <Page>
      <Layout>
        <Layout.AnnotatedSection
          title="Register"
          description={
            <a
              style={{
                textDecoration: 'none',
                color: '#357997',
                cursor: 'pointer',
              }}
              href="/login"
            >
              sign in
            </a>
          }
        >
          <Card sectioned>
            <FormLayout>
              <TextField
                label="Username"
                value={username}
                onChange={data => setUsername(data)}
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={data => setEmail(data)}
              />
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={data => setPassword(data)}
              />
              <Button primary onClick={() => signup(username, password, email)}>
                Sign Up
              </Button>
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}
