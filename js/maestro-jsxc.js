$(function() {
   var settings = {
      xmpp: {
         url: 'https://xmpp.arnaudbouts.fr/http-bind/',
         domain: 'arnaudbouts.fr',
         resource: 'example',
         overwrite: true
      }
   };

   // Initialize core functions, intercept login form
   // and attach connection if possible.
   jsxc.init({
      loginForm: {
         form: '#form',
         jid: '#username',
         pass: '#password'
      },
      logoutElement: $('#logout'),
      rosterAppend: 'body',
      root:'./jsxc',
      displayRosterMinimized: function() {
         return true;
      },
      loadSettings: function(username, password, cb) {
         cb(settings);
      },
      xmpp: {
         url: settings.xmpp.url
      }
   });

   // helper variable
   var source = '#form';

   // AJAX login
   $('#form2').submit(function(ev) {
      ev.preventDefault();

      source = $(this);
      //$('#submit2').button('loading');

      jsxc.start($('#username2').val() + '@' + settings.xmpp.domain, $('#password2').val());
   });

// form elements which needs to be enabled/disabled
   var formElements = $('#form2').find('input');

   $(document).on('connecting.jsxc', function() {
      formElements.prop('disabled', true);
   });

   $(document).on('authfail.jsxc', function() {
      formElements.prop('disabled', false);
      $(source).find('.alert').show();
      $(source).find('.submit').button('reset');
   });

   $(document).on('attached.jsxc', function() {
      formElements.prop('disabled', true);
      $('.submit').hide();
      $('form .alert').hide();
      $('form .username').hide();
      $('form .password').hide();

      $('.logout').show().click(jsxc.xmpp.logout);
   });

   $(document).on('disconnected.jsxc', function() {
      $(source).find('button').button('reset');
      formElements.prop('disabled', false);
      $('.submit').show();
      $('.logout').hide().off('click');
   });
});