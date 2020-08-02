
/**
 * Project.js
 *
 * A personal project.
 */

module.exports = {

    primaryKey: 'id',

    cascadeOnDestroy: true,

    attributes: {
  
        owner: { 
            model: 'user',
            required: true,
        },

        creator: {
            type: 'string',
            required: false,
            allowNull: true,
            maxLength: 300,
        },

        description: {
            type: 'string',
            allowNull: true,
            required: false,
            description: 'Description of the event',
        },

        images: {
            collection: 'projectimage',
            via: 'project'
        },

        classYear: {
            type: 'string',
            allowNull: true,
            required: false,
            isIn: ['1. klasse', '2. klasse', '3. klasse', '4. klasse','5. klasse'],
            maxLength: 10, 
        },

        course: {
            type: 'string',
            allowNull: true,
            required: false,
            maxLength: 150, 
        },
    },
    
  };
  