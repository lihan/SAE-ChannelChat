/**
 * Created by lihan on 8/03/2014.
 */
'use strict';



var ChatAppController = can.Control(
    {
        /**
         * Message form
         */
        form: null,
        /**
         * Array of all my message ids
         * @type Array
         */
        myMessageIds: null,
        init: function() {
            var self = this;
            this.myMessageIds = [];
            this.loaderImage = this.element.find('.js-loader');
            this.submitBtn = this.element.find('.js-submit');

            this.$messageWrapper = this.element.find(
                '.messages-wrapper > .inner');
            this.form = this.element.find('.js-msg-form');

            this.form.submit(function() {
                self._updateMessageId();
                self.setBusy(true);
                $.post(self.form.attr('action'), self.form.serialize(), function(){
                });
                return false;
            });
        },
        ' onMessage': function(elm, ev, message) {

            if (message) {
                var messageJSON = $.parseJSON(message.data);
                var isMyMessage = $.inArray(messageJSON.message_id, this.myMessageIds) > -1;
                this.appendMessage(messageJSON.message, isMyMessage);
            }

        },
        setBusy: function(isBusy) {
            if (isBusy) {
                
                this.submitBtn.hide();
                this.loaderImage.show();
            } else {
                this.submitBtn.show();
                this.loaderImage.hide();
            }
        },
        _updateMessageId: function() {
            var randomId = this._genMessageId(8);
            this.element.find('input[name="message_id"]').val(
                randomId
            );
            this.myMessageIds.push(randomId);
        },
        _genMessageId: function(length) {
            return (Math.random().toString(36) +
                '00000000000000000').slice(2, length+2);
        },
        '_resetForm': function() {
            this.element.find('input[name="message"]').val('');
        },
        '.js-submit click': function($elm, ev) {
            ev.preventDefault();
            ev.stopPropagation();
            this.form.submit();
        },
        appendMessage: function(messageText, isMyMessage) {
            var $messageElm = $('<div />').
                text(messageText).addClass('message');

            if (isMyMessage) {
                this.setBusy(false);
                this._resetForm();
                $messageElm.addClass('from');
            } else {
                $messageElm.addClass('to');
            }
            $messageElm.appendTo(this.$messageWrapper);
        }

    }
);


$(document).ready(function(){
    var $appElm = $('.js-chat-app');
    var socket = new sae.Channel($appElm.data('channel-url'));

    ChatAppController.newInstance($appElm);
    socket.onmessage = function(message) {
        $appElm.trigger('onMessage', message);
    }
});
