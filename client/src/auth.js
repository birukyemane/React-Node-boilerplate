const auth = {
  isAuthenticated: false,
  user: {},
  authenticate (cb) {
    this.isAuthenticated = true;
    setTimeout (cb, 100); // fake async - what is these??
  },
  signout (cb) {
    this.isAuthenticated = false;
    setTimeout (cb, 100); // fake async
  },
};
export default auth;
