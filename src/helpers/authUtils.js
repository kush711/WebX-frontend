const houses = ['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin'];

// Randomly assign a house to a new user
const getRandomHouse = () =>{
  const idx = Math.floor(Math.random()*4);
  return houses[idx];
};

// Save a new user to localStorage and assign a house
export const saveUserToStorage = (user) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userWithHouse = {
    ...user ,
    house:getRandomHouse()
  };
  users.push(userWithHouse);
  localStorage.setItem('users', JSON.stringify(users));
};

// Check if a username already exists
export const isUserExists = (name) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.some(user => user && user.name === name);
};

// Get user data by name (used during login)
export const getUserByName = (name) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find(user => user.name === name);
};