/**
 * @file paragraphs.modal.js
 *
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  /**
   * Click handler for click "Add" button between paragraphs.
   *
   * @type {Object}
   */
  Drupal.behaviors.paragraphsModalAdd = {
    attach: function (context) {
      $('.paragraph-type-add-modal-button', context)
        .once('add-click-handler')
        .on('click', function (event) {
          var $button = $(this),
              addFormType = drupalSettings.paragraphs.addForm,
              $add_more_wrapper = $button.parent().siblings('.paragraphs-add-' + addFormType);

          Drupal.paragraphsAddModal.openDialog($add_more_wrapper, $button.val(), addFormType);

          // Stop default execution of click event.
          event.preventDefault();
          event.stopPropagation();
        });
    }
  };

  /**
   * Namespace for modal related javascript methods.
   *
   * @type {Object}
   */
  Drupal.paragraphsAddModal = {};

  /**
   * Open modal dialog for adding new paragraph in list.
   *
   * @param {Object} $context
   *   jQuery element of form wrapper used to submit request for adding new
   *   paragraph to list. Wrapper also contains dialog template.
   * @param {string} title
   *   The title of the modal form window.
   * @param {string} addFormType
   *   Form type selected in field settings.
   */
  Drupal.paragraphsAddModal.openDialog = function ($context, title, addFormType) {

    var formType = {
      modal_full : {
        width : '90%',
        resizable : true
      },
      dialog : {
        width : 'auto',
        resizable : false
      }
    };

    $context.dialog({
      modal: true,
      resizable: formType[addFormType].resizable,
      title: title,
      width: formType[addFormType].width,
      close: function () {
        var $dialog = $(this);

        // Destroy dialog object.
        $dialog.dialog('destroy');
        // Reset delta after destroying the dialog object.
        var $delta = $dialog.closest('.clearfix')
          .find('.paragraph-type-add-modal-delta');
        $delta.val('');
      }
    });

    // Close the dialog after a button was clicked.
    $('.field-add-more-submit', $context)
      .each(function () {
      // Use mousedown event, because we are using ajax in the modal add mode
      // which explicitly suppresses the click event.
      $(this).on('mousedown', function () {
        var $this = $(this);
        $this.closest('div.ui-dialog-content').dialog('close');
      });
    });
  };

}(jQuery, Drupal, drupalSettings));
