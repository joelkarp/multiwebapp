
/*
    component: [ ccm.component, 'http://mutex.fail/jk/ccm.itemverwaltung.js' ],  // integration of an component object
    component_chat:[ccm.component,'http://mutex.fail/jk/ccm.itemverwaltung.js'],
*/

ccm.component( {              // This component is also available in this
  name: 'itemmitchat',         // GitHub repository (akless/ccm-developer).
  config: {
    instance_items: [ ccm.instance, ' http://joelkarp.github.io/ab3/ccm.itemverwaltung.js' ],
    instance_chat: [ ccm.instance, 'http://mutex.fail/bk/ccm.messenger.js' ],
    style: [ccm.load,'style.css'],
    key : 'itemtestverwaltungmitdatumundloeschen',
    store: [ccm.store,{url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'itemstore'}],
    keyChat :'testmessenger',
    storechat:[ccm.store,{url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'messengerstore123'}]

  },                                                       // ccm components.
  Instance: function () {
    var zahler = 0;
    var self=this;
    self.init = function ( callback ) {
      console.log("init");
      self.store.onChange = function(){self.notify();};
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





      if ( callback ) callback();
    }
    self.notify = function () {
      self.store.get( self.key,function(data){

        if(data===null)
          self.store.set( { key: self.key, items: [] }, proceed );

        else
         proceed(data);


        function proceed(data) {
          console.log("last item autor: "+data.items[data.items.length-1].user);
          //t



          self.storechat.get( self.keyChat , function(datachat){

            if(datachat===null)
              self.storechat.set( { key: self.keychat, messages: [] }, proceedChat );

            else
             proceedChat(datachat);


            function proceedChat(dataChat) {


              dataChat.messages.push( { user: "ToDo liste", datum: getTime() ,text: "veränderung" } );

              self.storechat.set( dataChat, function () { self.render(); } );





                function getTime(){
                  var date = new Date();
                  var stunden = date.getHours();
                  var minuten = date.getMinutes();
                  var seconde = date.getSeconds();
                  var tag = date.getDate();
                  var monatDesJahres = date.getMonth();
                  var jahr = date.getFullYear();
                  var tagInWoche = date.getDay();
                  var wochentag = new Array("Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag");
                  var monat = new Array("Januar", "Februar", "M&auml;rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember");

                  var datum;
                      console.log(datum);

                  if(minuten<10){
                       datum = wochentag[tagInWoche] + ", " + tag + ". " + monat[monatDesJahres] + " " + jahr + " um " + stunden+":0" + minuten ;

                  }else{
                        datum = wochentag[tagInWoche] + ", " + tag + ". " + monat[monatDesJahres] + " " + jahr + " um " + stunden+":" + minuten ;

                  }

                      return datum;
                };





            }

          }
          );
          //ende t





        }

      }
      );
    }



  }
} );
