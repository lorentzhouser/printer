
/**
 * ProjectImage.js
 *
 * ProjectImage.
 */

module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: false,
            allowNull: true,
            maxLength: 500,
        },

        project: {
            model: 'project',
            // required: true
        },
        
        imageURL: {
            type: 'string',
            required: true,
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

  };
  