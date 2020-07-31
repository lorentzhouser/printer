var fileUpload = require('../file-upload.js'); 

module.exports = {

    friendlyName: 'Create New Event',
  
    description: 'Create New Event',
    
    files: ['imageFile'],

    inputs: {
  
        title: {
            type: 'string',
            required: true,
            unique: true,
            maxLength: 200,
            example: 'Event'
        },

        short_description: {
            type: 'string',
            allowNull: true,
            required: false,
            description: 'Short description of the event',
        },
    
        description: {
            type: 'string',
            description: 'Description of the event',
        },

        location: {
            type: 'string',
            allowNull: true,
            required: false,
            maxLength: 50, 
        },
        event_start_time: {
            type: 'number',
        },
        event_end_time: {
            type: 'number',
            allowNull: true,
            required: false,
        },
        registration_required: {
            type: 'boolean',
            defaultsTo: false,  
        },
        registration_start_time: {
            type: 'number',
            allowNull: true,
            required: false,  
        },
        alumni: {
            type: 'boolean',
            defaultsTo: false,
        },
        class_1: {
            type: 'boolean',
            defaultsTo: false,
        },
        class_2: {
            type: 'boolean',
            defaultsTo: false,
        },
        class_3: {
            type: 'boolean',
            defaultsTo: false,
        },
        class_4: {
            type: 'boolean',
            defaultsTo: false,
        },
        class_5: {
            type: 'boolean',
            defaultsTo: false,
        },
        only_komite: {
            type: 'boolean',
            defaultsTo: false,
        },
        available_spots: {
            type: 'number',
            allowNull: true,
            required: false,
        },
        registered_users: {
            type: 'ref',
            collection: 'User',
            via: 'event_registrations',
            // required: false,
            // many to many
        },  
        waiting_list: {
            type: 'ref',
            collection: 'User',
            via: 'waiting_lists',
            // required: false,
            // many to many
        },
        
        imageFile: {
            type: 'ref',
            required: false,
            description: 'Image file',
        },
    },
  
  
    exits: {
  
      success: {
        description: 'New event created successfully.'
      },

      successWithoutImage: {
          description: 'New event created successfully. Failed image upload.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'The provided details  are invalid.',
        extendedDescription: 'If this request was sent from a graphical user interface, the request '+
        'parameters should have been validated/coerced _before_ they were sent.'
      },
  
      noRecordings: {
        responseType: 'no recordings',
        description: `You don't have any recording for this event`,
      },
      
      serverError: {
        responseType: 'server error',
        description: `Failed to upload the file`,
      }

    },
  
    fn: async function (inputs, exits) {
        fileUpload.upload(inputs.imageFile, "/images/events", 10000000)
        .then((imageDirectory) => {
            Event.create({ 
                title : inputs.title,
                short_description : inputs.short_description,
                description : inputs.description,
                location : inputs.location ,
                event_start_time : inputs.event_start_time,
                event_end_time : inputs.event_end_time,
                registration_required : inputs.registration_required,
                registration_start_time : inputs.registration_start_time,
                alumni : inputs.alumni,
                class_1 : inputs.class_1,
                available_spots : inputs.available_spots,
                imageURL : imageDirectory,
             })
            .then(() => {
                return exits.success('sucessfully created');
            })
            .catch(() => {
                return exits.serverError('could not create committee');
            });
        })
        .catch((err) => { 
            sails.log.warn('File Upload Fail');
            Event.create({ 
                title : inputs.title,
                short_description : inputs.short_description,
                description : inputs.description,
                location : inputs.location ,
                event_start_time : inputs.event_start_time,
                event_end_time : inputs.event_end_time,
                registration_required : inputs.registration_required,
                registration_start_time : inputs.registration_start_time,
                alumni : inputs.alumni,
                class_1 : inputs.class_1,
                available_spots : inputs.available_spots,
                imageURL : '',
             })
            .then(() => {
                return exits.successWithoutImage('sucessfully created');
            })
            .catch(() => {
                return exits.serverError('could not create committee');
            });  
        })
    },
  };
  

