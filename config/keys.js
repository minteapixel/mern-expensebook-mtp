// module.exports = {
//   mongoURI:
//   'mongodb://minty:rustykawaiix3@ds145895.mlab.com:45895/expenses-react-mtp',
//   secret: 'asl28934lknsdflis2df',
//   cookieKey: 'df984hf9md?!@kdf'
// };

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}