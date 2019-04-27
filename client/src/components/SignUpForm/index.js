import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Button,
} from '@shopify/polaris';
import React from 'react';

export default function RegisterForm(props) {
  const { username, password, email, onChange, signup } = props;
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
                onChange={data => onChange('username', data)}
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={data => onChange('email', data)}
              />
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={data => onChange('password', data)}
              />
              <Button primary onClick={signup}>
                Sign Up
              </Button>
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}
