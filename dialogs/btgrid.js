// Note: This automatic widget to dialog window binding (the fact that every field is set up from the widget
// and is committed to the widget) is only possible when the dialog is opened by the Widgets System
// (i.e. the widgetDef.dialog property is set).
// When you are opening the dialog window by yourself, you need to take care of this by yourself too.

CKEDITOR.dialog.add( 'btgrid', function( editor ) {

  var lang = editor.lang.btgrid,
      commonLang = editor.lang.common;

  var dialog = {
		title: 'Edit Bootstrap grid',
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
						label: 'Select number of columns',
						validate: CKEDITOR.dialog.validate.notEmpty( "Please select number of columns." ),
						items: [
			  [ '2', 2],
              [ '3', 3],
              [ '4', 4],
              [ '6', 6],
              [ '12', 12],
						],
						// When setting up this field, set its value to the "align" value from widget data.
						// Note: Align values used in the widget need to be the same as those defined in the "items" array above.
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
						validate: CKEDITOR.dialog.validate.notEmpty( "Please insert numeric value for Number of rows." ),
						width: '50px',
						label: 'Number of rows to generate',
						// When setting up this field, set its value to the "align" value from widget data.
						// Note: Align values used in the widget need to be the same as those defined in the "items" array above.
						setup: function( widget ) {
							this.setValue( widget.data.rowCount );
						},
						// When committing (saving) this field, set its value to the widget data.
						commit: function( widget ) {
							widget.setData( 'rowCount', this.getValue() );
						}
					}
				]
			}
		],
	};

  return dialog;
} );
