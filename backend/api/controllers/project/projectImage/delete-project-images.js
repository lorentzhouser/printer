module.exports = {


    friendlyName: 'Delete Project Images',
  
  
    description: 'Only for testing',
  
    exits: {
  
      success: {
        description: 'Projects deleted successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'The provided details  are invalid.',
        extendedDescription: 'The object you are trying to delete does not exist'
      },
  
    },
  
  
    fn: async function (inputs) {
        const records = await ProjectImage.destroy({}).fetch();
        if (records.length == 0) {
            throw({invalid: { error:'project images do not exist'}})
        }
        return records;
    }
  
  };
  