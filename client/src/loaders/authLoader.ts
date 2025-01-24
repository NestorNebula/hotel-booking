import { redirect } from 'react-router';

const authLoader: () => Response | boolean = () => {
  if (localStorage.getItem('id')) {
    return redirect('/');
  }
  return true;
};

export default authLoader;
