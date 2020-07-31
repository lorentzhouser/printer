
/**
 * Event.js
 *
 * A leonardo event.
 */

module.exports = {

    attributes: {
  
      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
  
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
            collection: 'User',
            via: 'event_registrations',
            // required: false,
            // many to many
        },  
        waiting_list: {
            collection: 'User',
            via: 'waiting_lists',
            // required: false,
            // many to many
        },
        // slug
        imageURL: {
            type: 'string',
            required: false,
            //resize to fit 2000,2000
            //upload to events/
            //quality 85
        },
        
        thumbnailURL: {
            type: 'string',
            required: false,
            //get from imageURL, but send small version 300,300 at 100 quality
        },

    },

    get_class_year: function(graduation_year) {
        const NOW = datetime.datetime.now()
        const YEAR = NOW.year
        if (NOW.month > 7) {
            YEAR += 1
        }

        const YEAR_CHOICES = [
            (5000, 'Alle (inkludert alumni)'),
            (YEAR+4, '1. - 5. klasse'),
            (YEAR+3, '2. - 5. klasse'),
            (YEAR+2, '3. - 5. klasse'),
            (YEAR+1, '4. og 5. klasse'),
            (YEAR, '5. klasse')
        ];
        
        return graduation_year - YEAR;
    }

  };
  