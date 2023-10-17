const correctLoginData = { "email": "admin@admin.com", "password": "secret_admin" };
const correctUserData = {
  id: 1, username: 'Admin', role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}
const mockedJWT = { id: 1, role: 'admin', iat: 1696537981, exp: 1697142781 };
export { mockedJWT, correctLoginData, correctUserData };