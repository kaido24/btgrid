
(function(){
  CKEDITOR.plugins.add('btgrid', {
      lang: 'en,ru,fr,nl,de',
      requires: 'widget,dialog',
      icons: 'btgrid',
      init: function(editor) {
       var maxGridColumns = 12;
       var lang = editor.lang.btgrid;

       CKEDITOR.dialog.add('btgrid',  this.path + 'dialogs/btgrid.js');

       editor.addContentsCss( this.path + 'styles/editor.css');
       // Add widget
       editor.ui.addButton('btgrid', {
         label: lang.createBtGrid,
         command: 'btgrid',
         icon: this.path + 'icons/btgrid.png'
       });
       editor.widgets.add('btgrid',
         {
           allowedContent: 'div(!btgrid);div(!row,!row-*);div(!col-*-*);div(!content)',
           requiredContent: 'div(btgrid)',
           parts: {
             btgrid: 'div.btgrid',
           },
           editables: {
             content: '',
           },
           template:
                   '<div class="btgrid">' +
                   '</div>',
           //button: lang.createBtGrid,
           dialog: 'btgrid',
           defaults: {
            //  colCount: 2,
            // rowCount: 1
          },
          // Before init.
           upcast: function(element) {
             return element.name == 'div' && element.hasClass('btgrid');
           },
           // initialize
           // Init function is useful after copy paste rebuild.
           init: function() {
             var rowNumber= 1;
             var rowCount = this.element.getChildCount();
             for (rowNumber; rowNumber <= rowCount;rowNumber++) {
               this.createEditable(maxGridColumns, rowNumber);
             }
           },
           // Prepare data
           data: function() {
             if (this.data.colCount && this.element.getChildCount() < 1) {
               var widthAuto = maxGridColumns/this.data.colCount
               var manual = parseInt(this.data.colCount) === 1
               var data = this.data
               var total = 0
               var cols = manual ? (
                 [1,2,3,4,5,6,7,8,9,10,11,12].reduce(function(a,i){
                   var val = parseInt(data['colWidth'+i]) || 0
                   if(val) a.push(val)
                   total = total + val
                   return a
                 }, []).filter(function(n){return !!n})
               ) : (
                 (function(cnt){
                   var a = [];
                   for (var i=1; i<=cnt; i++) a.push(widthAuto);
                   return a;
                 })(this.data.colCount)
               )
               if(total>12) { alert(lang.manualTotalError); return; }
               var rowCount = this.data.rowCount;
               var row = this.parts['btgrid'];
               for (var i= 1;i <= rowCount;i++) {
                 this.createGrid(cols, row, i);
               }
             }
           },
           //Helper functions.
           // Create grid
           createGrid: function(cols, row, rowNumber) {
             var content = '<div class="row row-' + rowNumber + '">';
              cols.forEach(function(width, i) {
                content = content + (
                  '<div class="col col-md-' + width + '">' +
                  '  <div class="content">' +
                  '    <p>Col ' + i + ' content area</p>' +
                  '  </div>' +
                  '</div>'
                );
              })
             content = content + '</div>';
             row.appendHtml(content);
             this.createEditable(cols.length, rowNumber);
           },
           // Create editable.
           createEditable: function(colCount,rowNumber) {
             for (var i = 1; i <= colCount; i++) {
               this.initEditable( 'content'+ rowNumber + i, {
                  selector: '.row-'+ rowNumber +' > div:nth-child('+ i +') div.content'
                } );
              }
            }
          }
        );
      }
    }
  );

})();
