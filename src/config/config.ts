export default {
  jwt: {
    secretOrKey: process.env.JWT_SECRET,
    expiresIn: 86400,
  },
  mail: {
    service: {
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
    senderCredentials: {
      name: 'Testerko',
      email: 'krsticmarkokg@gmail.com',
    },
  },
  // these are used in the mail templates
  project: {
    name: 'Eliefere',
    address: 'Silicon Valley 1, San Francisco',
    logoUrl: 'https://image.freepik.com/free-vector/bicycle-delivery_23-2148143984.jpg',
    slogan: 'delivery of all kinds of goods with ❤️ in a time and money efficient way',
    color: '#123456',
    socials: [
      ['GitHub', 'https://github.com/Gonzo84/eliefere-backend'],
    ],
    url: 'http://localhost:xxxx',
    mailVerificationUrl: 'http://localhost:3000/auth/verify',
    mailChangeUrl: 'http://localhost:3000/auth/change-email',
    resetPasswordUrl: 'http://localhost:xxxx/reset-password',
    termsOfServiceUrl: 'http://localhost:xxxx/legal/terms',
  },
  osrm: {
    server: 'http://osrm:5000/',
  },
};
