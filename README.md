Input matrix
===========

A jQuery plugin, that creates the table of text inputs, with tools for extending
and constricting table rows and a number of methods for interacting with row data.


* [Quick start](#quick-start "Quick start")
* [Configure](#configure "Configure")
* [API](#api "API")
* [Settings](#settings "Settings")
* [Methods](#methods "Methods")


Quick start
-----------
<pre>
//Quick install
&lt;script src="http://code.jquery.com/jquery-1.7.2.min.js"&gt;&lt;/script&gt;
&lt;script src="jquery.input-matrix.js"&gt;&lt;/script&gt;

&lt;div id="placeholder"&gt;&lt;/div&gt;
&lt;script&gt;
    $('#placeholder').inputMatrix();
&lt;/script&gt;
</pre>

Configure
---------
<pre>
//Configure
&lt;script src="http://code.jquery.com/jquery-1.7.2.min.js"&gt;&lt;/script&gt;
&lt;script src="jquery.input-matrix.js"&gt;&lt;/script&gt;

&lt;div id="placeholder"&gt;&lt;/div&gt;
&lt;script&gt;
    $('#placeholder').inputMatrix({
        //Number of rows
        rows    : 7,

        //Number of columns
        cols    : 5,

        //Input name prefix (will be "my_input_one_2_4" for row 2 and column 4 input item)
        name    : 'my_input_one',

        //Set the autocomplete tag to all input[type="text"] items in the matrix
        autocomplete: false,

        //Initial values array
        values  : [
            ['1_1', 	'1_2', 	'1_3', 	'1_4', 	'1_5'],
            ['2_1', 	'2_2', 	'2_3', 	'2_4', 	'2_5'],
            ['3_1', 	'3_2', 	'3_3', 	'3_4', 	'3_5'],
            ['4_1', 	'4_2', 	'4_3', 	'4_4', 	'4_5']
        ],

        //Callback after deleting a row node and return the order number of the deleted row
        onRowDelete: function(row_num){

        },

        //Callback after adding a row node and return order number of the newly created row
        onRowAdd: function(row_num){

        }
    });
&lt;script&gt;
</pre>

API
===========
Settings
---------
**rows**<br>
Number of table rows, integer (default is 1)
<br>

**cols**<br>
Number of table cols, integer (default is 2)
<br>

**name**<br>
Input name prefix. The name attribute of each input will be "my_input_one_[row_num]_[col_num]", string (default is "input_matrix").
<br>

**autocomplete**<br>
Set the autocomplete tag to all `input[type="text"]` items in the matrix
<br>

**values**<br>
Initial values, array (default is empty array)<br>
<pre>
[
    ['1_1', '1_2',  '1_3',  '1_4',  '1_5'],
    ['2_1', '2_2', 	'2_3', 	'2_4', 	'2_5'],
    ['3_1', '3_2', 	'3_3', 	'3_4', 	'3_5'],
    ['4_1', '4_2',  '4_3', 	'4_4', 	'4_5']
]
</pre>

**onRowAdd**<br>
A method, that calls after a row has been created. It
calls with a `row_num` attribute (integer), which is the number of the newly created row.
<pre>
$('#placeholder').inputMatrix({
    onRowAdd: function(row_num){
        alert(row_mun)
    }
});
</pre>

**onRowDelete**<br>
A method, that calls after the row has been deleted,
it calls with a `row_num` attribute (integer), which is the number of the deleted row.
<pre>
$('#placeholder').inputMatrix({
    onRowDelete: function(row_num){
        alert(row_mun)
    }
});
</pre>

To apply the settings, use the code below.
<pre>
$('#placeholder').inputMatrix({
    rows    : 7,
    cols    : 5,
    name    : 'my_input_one',
    autocomplete: false,
    values  : [
        ['1_1', 	'1_2', 	'1_3', 	'1_4', 	'1_5'],
        ['2_1', 	'2_2', 	'2_3', 	'2_4', 	'2_5'],
        ['3_1', 	'3_2', 	'3_3', 	'3_4', 	'3_5'],
        ['4_1', 	'4_2', 	'4_3', 	'4_4', 	'4_5']
    ],
    onRowDelete: function(row_num){

    },
    onRowAdd: function(row_num){

    }
});
</pre>


Methods
---------
**addRow(row_num)**<br>
Creates a row item. Must receive row number as argument.
The new row will be inserted after the given row number.

**deleteRow(row_num)**<br>
Deletes a row. Must receive row number as argument.

**setValue(row_num, col_num, value)**<br>
Sets the value of the given input item.

**getValue(row_num, col_num)**<br>
Gets the value of the given input item.

**getMatrixData()**<br>
Gets the full matrix data array

**getRowData(row_num)**<br>
Gets the full row data array

To call an API method, use the code below.
<pre>
var p = $('#placeholder').inputMatrix():
p.inputMatrix('setValue', 1, 2, 'Test 1');
</pre>

* [Quick start](#quick-start "Quick start")
* [Configure](#configure "Configure")
* [API](#api "API")
* [Settings](#settings "Settings")
* [Methods](#methods "Methods")