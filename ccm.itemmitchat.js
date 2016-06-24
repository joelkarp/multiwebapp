
/*
    component: [ ccm.component, 'http://mutex.fail/jk/ccm.itemverwaltung.js' ],  // integration of an component object
    component_chat:[ccm.component,'http://mutex.fail/jk/ccm.itemverwaltung.js'],
*/

    /** ccm.blank_chat.js */
  ccm.component( {              // This component is also available in this
    name: 'itemmitchat',         // GitHub repository (akless/ccm-developer).
    config: {
      instance_items: [ ccm.instance, 'http://mutex.fail/jk/ccm.itemverwaltung.js' ],  // Integration of two ccm
      instance_chat: [ ccm.instance, 'http://mutex.fail/jk/ccm.itemverwaltung.js' ]     // instances of different
    },                                                        // ccm components.
    Instance: function () {
      this.init = function ( callback ) {
        this.instance_items.element = ccm.helper.find( this, '.items' );  // Set website area for
        this.instance_chat.element = ccm.helper.find( this, '.chat' );  // both ccm instances.
        callback();
      };
      this.render = function ( callback ) {
        var element = ccm.helper.element( this );
        element.html( '<div class="items"></div><div class="chat"></div>' );
        this.instance_items.render();    // Embeds each of both ccm instances
        this.instance_chat.render();    // in different inner website areas.
        if ( callback ) callback();
      }
    }
  } );
