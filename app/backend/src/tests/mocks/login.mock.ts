const user1  = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const validUser1 = {
  password: 'secret_admin',
  email: 'admin@admin.com',
}

const invalidPasswordUser1 = {
  password: 'secret',
  email: 'admin@admin.com',
}

const invalidEmailUser1 = {
  password: 'secret_admin',
  email: 'adm@admin.com',
}

const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"

export default { 
  user1,
  validUser1,
  invalidPasswordUser1,
  invalidEmailUser1,
  token,
}