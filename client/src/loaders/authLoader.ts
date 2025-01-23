import { redirect } from 'react-router';

const authLoader: () => Response | void = () => {
  if (localStorage.getItem('id')) {
    return redirect('/');
  }
  return;
};

export default authLoader;
