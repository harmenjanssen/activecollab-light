/**
 * Provides a function returning a dressed-up ActiveCollab API instance.
 */
const ac = require("activecollabjs")();

module.exports = request => {
  ac.setHost(process.env.SELF_HOSTED_URL);
  ac.setToken(request.session.auth);
  return ac;
};
