
/**
 * Committee.js
 *
 * A leonardo committee.
 */

module.exports = {

    attributes: {
  
      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
  
      name: {
        type: 'string',
        required: true,
        unique: true,
        maxLength: 200,
        example: 'Arrkom'
      },
  
      description: {
        type: 'string',
        description: 'Description of the committee',
      },

      imageURL: {
        type: 'string',
        description: 'path to committee icon asset'
      },

    //   slug: {
    //     type: 'string',
    //     isEmail: true,
    //     description: 'A still-unconfirmed email address that this user wants to change to (if relevant).'
    //   },

    },

  };
  