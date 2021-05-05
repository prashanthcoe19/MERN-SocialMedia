import axios from 'axios';
const create = async (user) => {
  try {
    let response = await axios({
      method: 'post',
      url: '/api/users',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(user),
    });
    return await response.data;
  } catch (err) {
    console.log(err);
  }
};

export { create };
