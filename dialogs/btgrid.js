CKEDITOR.dialog.add( 'btgrid', function( editor ) {
  var lang = editor.lang.btgrid;
  var commonLang = editor.lang.common;
  return {
    title: lang.editBtGrid,
    minWidth: 600,
    minHeight: 300,
    contents: [
      {
        id: 'info',
        label: lang.infoTab,
        accessKey: 'I',
        elements: [
          {
            id: 'colCount',
            type: 'select',
            label: lang.selNumCols,
            items: [
              [ '2', '2'],
              [ '3', '3'],
              [ '4', '4'],
              [ '6', '6'],
              [ '12', '12'],
            ],
            validate: function() {
              if (this.getValue() < 1 ) {
                  return false;
              }
            },
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
            width: '50px',
            label: lang.genNrRows,
            validate: function() {
              if (this.getValue() < 1) {
                  return false;
              }
            },
            setup: function( widget ) {
              this.setValue( widget.data.rowCount );
            },
            commit: function( widget ) {
              widget.setData( 'rowCount', this.getValue() );
            }
          }
        ]
      }
    ],
  };
});
