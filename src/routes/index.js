module.exports = (app) => {
  app
    .use('/', require('./default.routes'))
    .use('/v1/mail', require('./mail.routes'))
}