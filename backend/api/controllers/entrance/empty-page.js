module.exports = {


    friendlyName: 'View nothing at all',
  
  
    description: 'This is a test page for checking GCODE global accessibility.',
  
    exits: {
  
      success: {
        viewTemplatePath: 'pages/entrance/empty-page',
      },
  
      redirect: {
        description: 'The requesting user is not logged in.',
        responseType: 'redirect'
      }
  
    },
  
    fn: async function () {
  
      if (!this.req.me) {
        throw {redirect: '/'};
      }

    }  
  };
  