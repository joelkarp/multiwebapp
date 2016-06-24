
/*
    component: [ ccm.component, 'http://mutex.fail/jk/ccm.itemverwaltung.js' ],  // integration of an component object
    component_chat:[ccm.component,'http://mutex.fail/jk/ccm.itemverwaltung.js'],
*/


  ccm.component( {
    name: 'itemmitchat',
    config: {
      instance_items: [ ccm.instance, 'http://mutex.fail/jk/ccm.itemverwaltung.js' ],
      instance_chat: [ ccm.instance, 'http://mutex.fail/bk/ccm.messenger.js' ],
      style: [ccm.load,'style.css']
    },
    Instance: function () {
      this.init = function ( callback ) {
        this.instance_items.element = ccm.helper.find( this, '.ite' );
        this.instance_chat.element = ccm.helper.find( this, '.chat' );
        callback();
      };
      this.render = function ( callback ) {
        var element = ccm.helper.element( this );
        element.html( '<div class="ite"></div><div class="chat"></div>' );
        this.instance_items.render();
        this.instance_chat.render();
        if ( callback ) callback();
      }
    }
  });
