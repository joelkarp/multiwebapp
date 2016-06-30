
/*
    component: [ ccm.component, 'http://mutex.fail/jk/ccm.itemverwaltung.js' ],  // integration of an component object
    component_chat:[ccm.component,'http://mutex.fail/jk/ccm.itemverwaltung.js'],
*/






ccm.component( {
  name: 'itemmitchat',
  config: {
    instance_items: [ ccm.instance, 'http://www2.inf.fh-bonn-rhein-sieg.de/~jkarp2s/ab3/ccm.itemverwaltung.js' ],
    //instance_chat: [ ccm.instance, 'http://www2.inf.fh-bonn-rhein-sieg.de/~bkharb2s/ab3/ccm.messenger.js' ],
    instance_chat: [ ccm.instance, 'http://bkharb2s.github.io/ccm.messenger.js' ],
    style: [ccm.load,'http://www2.inf.fh-bonn-rhein-sieg.de/~jkarp2s/ab4/style.css'],
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
      self.instance_items.element = ccm.helper.find( this, '.ite' );
      self.instance_chat.element = ccm.helper.find( this, '.chat' );

      callback();
    };
    self.render = function ( callback ) {
        console.log("render");
      var element = ccm.helper.element( this );
      element.html( '<div class="apphintergrund"><div class="ite"></div><div class="chat"></div></div>' );


      self.instance_items.render();
      self.instance_chat.render();




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


              dataChat.messages.push( { user: "ToDo liste", datum: getTime() ,text: "In der ToD liste wurde ein item verändert" } );

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
