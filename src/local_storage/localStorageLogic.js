export const addUser = (props) => {
  const users = getUsers();
  const exUser = users
  .find((user) => user.email === props.email);
  if (exUser !== undefined) {
    return false;
  }
  else {
    console.log(JSON.stringify(props));
    users.push(props);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedUserEmail', props.email);
    return true;
  }
}

export const checkUser = (props) => {
  const existingUser = getUsers()
  .find((user) =>
      user.email === props.email &&
      user.password === props.password
  );
  return existingUser === undefined ? false : true;
}

export const logOutUser = () => {
  localStorage.setItem('loggedUserEmail', null);
}

export const getUsers = () => {
  const users = JSON.parse(localStorage.getItem('users'));
  console.log(users);
  return users == null ? [] : users;
}
