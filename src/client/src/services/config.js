// eslint-disable-next-line import/prefer-default-export
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : 'https://kiipeli.onrender.com/api'; // "https://kiipeli.herokuapp.com/api"; //"http://localhost:3001/api"; // 'https://bongari-app.herokuapp.com/api'; // 'http://localhost:3001/api'; //  // ; //  //  //  //  //  // ; //  // ; //  // ;