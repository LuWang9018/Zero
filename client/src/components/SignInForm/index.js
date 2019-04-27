import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Button,
} from '@shopify/polaris';
import React, { useState } from 'react';

export default function SiginForm(props) {
  const { login } = props;
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Page>
      <Layout>
        <Layout.AnnotatedSection
          title="Sign In"
          description={
            <div style={{ display: 'grid' }}>
              <a
                style={{
                  textDecoration: 'none',
                  color: '#357997',
                  cursor: 'pointer',
                }}
                href="/forget_passowrd"
              >
                forget password?{' '}
              </a>
              <a
                style={{
                  marginTop: '20px',
                  textDecoration: 'none',
                  color: '#357997',
                  cursor: 'pointer',
                }}
                href="/signup"
              >
                sign up?{' '}
              </a>
            </div>
          }
        >
          <Card sectioned>
            <FormLayout>
              <TextField
                label="Username"
                value={username}
                onChange={data => setUserName(data)}
              />
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={data => setPassword(data)}
              />
              <Button primary onClick={() => login(username, password)}>
                Login
              </Button>
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}
