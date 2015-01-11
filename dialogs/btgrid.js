CKEDITOR.dialog.add( 'btgrid', function( editor ) {
  var lang = editor.lang.btgrid;
  commonLang = editor.lang.common;

  var dialog = {
    title: lang.editBtGrid,
    minWidth: 600,
    minHeight: 300,
    contents: [{
      id: 'info',
      label: lang.infoTab,
      accessKey: 'I',
      elements: [{
        id: 'colCount',
        type: 'select',
        label: lang.selNumCols,
        validate: CKEDITOR.dialog.validate.notEmpty( lang.numColsError ),
        items: [
          [ commonLang.notSet, '' ],
          [ '2', 2],
          [ '3', 3],
          [ '4', 4],
          [ '6', 6],
          [ '12', 12],
        ],
        setup: function( widget ) {
          this.setValue( widget.data.colCount );
        },
        // When committing (saving) this field, set its value to the widget data.
        commit: function( widget ) {
          widget.setData( 'colCount', this.getValue() );
        }
        },
        {
          id: 'rowCount',
          type: 'text',
          validate: CKEDITOR.dialog.validate.notEmpty( lang.numRowsError ),
          width: '50px',
          label: lang.genNrRows,
          setup: function( widget ) {
            this.setValue( widget.data.rowCount );
          },
          commit: function( widget ) {
            widget.setData( 'rowCount', this.getValue() );
          }
        }
      ],
      }
    ],
  };
  return dialog;
});
