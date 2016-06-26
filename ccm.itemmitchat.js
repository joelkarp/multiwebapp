
/*
    component: [ ccm.component, 'http://mutex.fail/jk/ccm.itemverwaltung.js' ],  // integration of an component object
    component_chat:[ccm.component,'http://mutex.fail/jk/ccm.itemverwaltung.js'],
*/

ccm.component( {              // This component is also available in this
  name: 'itemmitchat',         // GitHub repository (akless/ccm-developer).
  config: {
    instance_items: [ ccm.instance, 'http://mutex.fail/jk/ccm.itemverwaltung.js' ],
    instance_chat: [ ccm.instance, 'http://mutex.fail/bk/ccm.messenger.js' ],
    style: [ccm.load,'style.css'],
    key : 'itemtestverwaltungmitdatumundloeschen',
    store: [ccm.store,{url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'itemstore'}]
  },                                                       // ccm components.
  Instance: function () {
    var self=this;
    self.init = function ( callback ) {
      console.log("init");
      self.store.onChange = function(){self.render();};
      self.instance_items.element = ccm.helper.find( this, '.ite' );  // Set website area for
      self.instance_chat.element = ccm.helper.find( this, '.chat' );  // both ccm instances.
      callback();
    };
    self.render = function ( callback ) {
        console.log("render");
      var element = ccm.helper.element( this );
      element.html( '<div class="ite"></div><div class="chat"></div>' );
      self.instance_items.render();    // Embeds each of both ccm instances
      self.instance_chat.render();    // in different inner website areas.

      self.store.get( self.key,function(data){
        console.log("data:"+ data);
        if(data===null)
          self.store.set( { key: self.key, items: [] }, proceed );

        else
         proceed(data);


        function proceed(data) {
          console.log("in pro"+data);

        }

      }
      );



      if ( callback ) callback();
    }
  }
} );





/*

  ccm.component( {
    name: 'itemmitchat',
    config: {
      instance_items: [ ccm.instance, 'http://mutex.fail/jk/ccm.itemverwaltung.js' ],
      instance_chat: [ ccm.instance, 'http://mutex.fail/bk/ccm.messenger.js' ],
      style: [ccm.load,'style.css'],
      key : 'itemtestverwaltungmitdatumundloeschen',
      store: [ccm.store,{url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'itemstore'}]
    },
    Instance: function () {
      console.log("1");
        var self=this;
        self.init = function ( callback ) {
          self.instance_items.element = ccm.helper.find( this, '.ite' );
          self.instance_chat.element = ccm.helper.find( this, '.chat' );
          self.store.onChange = function(){  self.render();};
          callback();
        };
        self.render = function ( callback ) {
          self.store.get( self.key, function ( dataset ) {

             if ( dataset === null )
                self.store.set( { key: self.key, items: [] }, proceed );
            else
                proceed( dataset );


          function proceed(dataset) {



          var element = ccm.helper.element( this );
          element.html( '<div class="ite"></div><div class="chat"></div>' );
          self.instance_items.render();
          self.instance_chat.render();
          if ( callback ) callback();
        }
      });
      }
  }
});
*/
