/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  'GET /email/confirm':      { action: 'entrance/confirm-email' },

  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/terms':                   '/legal/terms',
  '/logout':                  '/api/v1/account/logout',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },

  //USERS
  'GET /users':                                             { action: 'user/get-users' },

  //JOB RESERVATION
  'GET /all-job-reservation-data':                          { action: 'jobReservation/get-all-jobs' },
  'GET /job-reservations-data':                             { action: 'jobReservation/get-jobs' },
  'GET /job-reservations':                                  { action: 'jobReservation/view-jobs' },
  'GET /reservation-proposal/:duration':                    { action: 'jobReservation/propose-jobs' },
  'POST  /api/v1/reserve-job':                              { action: 'jobReservation/create-job' },
  'POST  /api/v1/generate-job':                             { action: 'jobReservation/generate-job' },
  'DELETE  /api/v1/delete-job/:jobId':                      { action: 'jobReservation/delete-job' },

  //COMMITTEE
  'POST  /committee':                                       { action: 'committee/create-committee' },
  'GET   /committees':                                      { action: 'committee/get-committees' },
  'DELETE  /committees':                                    { action: 'committee/delete-committees' },

  //EVENT
  'POST  /event':                                           { action: 'event/create-event' },
  'GET   /events':                                          { action: 'event/get-events' },
  'DELETE  /events':                                        { action: 'event/delete-events' },

  //PROJECTS
  'POST    /project':                                       { action: 'project/create-project' },
  'PUT     /project':                                       { action: 'project/update-project' },
  'DELETE  /project':                                       { action: 'project/delete-project' },
  'GET     /projects':                                      { action: 'project/get-projects' },
  'DELETE  /projects':                                      { action: 'project/delete-projects' },

  //PROJECT-IMAGES
  'POST  /project-image':                                   { action: 'project/projectImage/create-project-image' },
  'GET   /project-images':                                  { action: 'project/projectImage/get-project-images' },
  'DELETE  /project-images':                                { action: 'project/projectImage/delete-project-images' },


};
