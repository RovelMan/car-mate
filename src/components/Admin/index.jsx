import * as React from 'react';
import { Layout, Typography } from 'antd';

// import * as ROLES from '../../constants/roles';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    const { firebase } = this.props;
    this.setState({ loading: true });
    firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            marginTop: 24,
            minHeight: 280,
          }}
        >
          <Title>Admin</Title>
          <Paragraph>
            Restricted area! Only users with the admin role are authorized.
          </Paragraph>
          {loading && <div>Loading list of users ...</div>}
          <UserList users={users} />
        </Content>
      </Layout>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.uid}>
        <span>
          <strong>{`ID: ${user.uid}`}</strong>
        </span>
        <span>
          <strong>{`E-Mail: ${user.email}`}</strong>
        </span>
        <span>
          <strong>{`Username: ${user.username}`}</strong>
        </span>
      </li>
    ))}
  </ul>
);

// const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];
const condition = (authUser) => !!authUser;

export default withFirebase(withAuthorization(condition)(Admin));
