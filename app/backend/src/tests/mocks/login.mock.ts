const user1  = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}

const validUser1 = {
  "email": "user@user.com",
  "password": "secret_user" 
}

const invalidPasswordUser1 = {
  "password": "secret",
  "email": "admin@admin.com",
}

const invalidEmailUser1 = {
  'password': 'secret_admin',
  'email': 'adm@admin.com',
}

const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"

export default { 
  user1,
  validUser1,
  invalidPasswordUser1,
  invalidEmailUser1,
  token,
}