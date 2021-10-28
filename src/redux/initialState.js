export const initialState = {
  posts: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
  user: {
    logged: true,
    id: '1',
    email: 'test@test.pl',
  },
};