import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Button,
} from '@shopify/polaris';
import React from 'react';

export default function SiginForm(props) {
  const { username, password, onChange, login } = props;
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
                onChange={data => onChange('username', data)}
              />
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={data => onChange('password', data)}
              />
              <Button primary onClick={login}>
                Login
              </Button>
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}
