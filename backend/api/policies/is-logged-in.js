/**
 * is-logged-in
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {

      sails.helpers.verifyJwt.with({
          req: req,
          res: res
      })
        .switch({
            error: function (err) {
                return res.serverError(err)
            },
            invalid: function (err) {
                // if this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
                // send a 401 response letting the user agent know they need to login to
                // access this endpoint.
                if (req.wantsJSON) {
                    return res.unauthorized();
                }
                // otherwise if this is an HTML-wanting browser, do a redirect.
                return res.redirect('/login')
            },
            success: function () {
                // user has been attached to the req object (ie logged in) so we're set, they may proceed
                return proceed()
            }
        })



  // If `req.me` is set, then we know that this request originated
  // from a logged-in user.  So we can safely proceed to the next policy--
  // or, if this is the last policy, the relevant action.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
    // if (req.me) {
    //   return proceed();
    // }

  //--•
  // Otherwise, this request did not come from a logged-in user.
    // return res.unauthorized();

};
