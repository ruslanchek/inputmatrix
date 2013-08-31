(function($){
    function createRemoveButton(){
        var remove_buton = $('<input/>', {
            class   : 'di_remove_row',
            type    : 'button',
            value   : '-'
        });

        return remove_buton;
    };
    
    function createAddButton(){
        var remove_buton = $('<input/>', {
            class   : 'di_add_row',
            type    : 'button',
            value   : '+'
        });

        return remove_buton;
    };

    var methods = {
        init: function(options){
            var settings = {
                rows            : 1,
                cols            : 2,
                name            : 'input_matrix',
                autocomplete    : false,
                values          : [],
                onRowAdd        : function(row_num){},
                onRowDelete     : function(row_num){}
            };

            if(options){
                $.extend(settings, options);
            };

            return this.each(function(){
                var $this           = $(this),
                    data            = $this.data('inputMatrix'),
                    input_matrix    = $('<table/>');

                $this.find('input.di_remove_row').live('click', function(){
                    var row = $(this).parent().parent();
                    $this.inputMatrix('deleteRow', row.data('row_num'));
				});
				
				$this.find('input.di_add_row').live('click', function(){
					var row = $(this).parent().parent();
                    $this.inputMatrix('addRow', row.data('row_num'));
				});

                if(!data){
                    $(this).data('input_matrix', {
                        target          : $this,
                        input_matrix    : input_matrix,
                        settings        : settings
                    });
                };

                for(var ir = 0; ir < settings.rows; ir++){
                    $(this).inputMatrix('addRow', ir, true);
                };

                $this.html(input_matrix);
            });
        },
		
		addRow: function(pre, init){
			return this.each(function(){
                var $this       = $(this),
                    data        = $this.data('input_matrix'),
					settings    = data.settings,
					tr          = $('<tr/>');

                tr.attr('row', pre);

				for(var ic = 0; ic < settings.cols; ic++){
					var value = '';

					if(settings.values[pre] && settings.values[pre][ic]){
						value = settings.values[pre][ic];
					};

                    var td = $('<td/>'),
                        input = $('<input/>', {
                            type            : 'text',
                            name            : settings.name + '_' + (pre+1) + '_' + (ic+1),
                            value           : (init) ? value : '',
                            autocomplete    : (settings.autocomplete) ? 'yes' : 'no'
                        });

					td.html(input);
					tr.append(td);
				};

                var td = $('<td/>', {
                    class: 'row_action_1'
                });

                if(pre > 0){
                    td.html(createRemoveButton());
                    tr.append(td);

                    var td = $('<td/>', {
                        class: 'row_action_2'
                    });
                    td.html(createAddButton());
                    tr.append(td);
                }else{
                    td.html(createAddButton());
                    tr.append(td);

                    var td = $('<td/>', {
                        class: 'row_action_2'
                    });
                    tr.append(td);
                };

				if(pre > 0){
                    data.input_matrix.find('tr[row="'+pre+'"]').after(tr);
				}else{
                    data.input_matrix.append(tr);
				};

                data.input_matrix.find('tr').each(function(i){
					$(this).data('row_num', i+1);
                    $(this).attr('row', i+1);
                    $(this).find('input[type="text"]').each(function(i2){
                        $(this).attr('name', settings.name + '_' + (i+1) + '_' + (i2+1));
                    });
				});

                if(!init){
                    settings.onRowAdd(pre+1);
                };

                if(data.input_matrix.find('tr').length > 1){
                    data.input_matrix.find('tr[row="1"] .row_action_1').html(createRemoveButton());
                    data.input_matrix.find('tr[row="1"] .row_action_2').html(createAddButton());
                }else{
                    data.input_matrix.find('tr[row="1"] .row_action_1').html(createAddButton());
                    data.input_matrix.find('tr[row="1"] .row_action_2').html('');
                };
			})
		},

        deleteRow: function(row_num){
            return this.each(function(){
                var $this       = $(this),
                    data        = $this.data('input_matrix'),
                    settings    = data.settings;

                data.input_matrix.find('tr[row="'+row_num+'"]').remove();

                data.input_matrix.find('tr').each(function(i){
                    $(this).data('row_num', i+1);
                    $(this).attr('row', i+1);
                    $(this).find('input[type="text"]').each(function(i2){
                        $(this).attr('name', settings.name + '_' + (i+1) + '_' + (i2+1));
                    });
                });

                if(data.input_matrix.find('tr').length > 1){
                    data.input_matrix.find('tr[row="1"] .row_action_1').html(createRemoveButton());
                    data.input_matrix.find('tr[row="1"] .row_action_2').html(createAddButton());
                }else{
                    data.input_matrix.find('tr[row="1"] .row_action_1').html(createAddButton());
                    data.input_matrix.find('tr[row="1"] .row_action_2').html('');
                };

                settings.onRowDelete(row_num);
            });
        },

        destroy: function(){
            return this.each(function(){
                var $this   = $(this),
                    data    = $this.data('input_matrix');

                $(window).unbind('.input_matrix');
                data.input_matrix.remove();
                $this.removeData('input_matrix');
            });
        },

        setValue: function(row, col, value){
            return this.each(function(){
                var $this       = $(this),
                    settings    = $this.data('input_matrix').settings;

                $this.find('input[name="'+settings.name+'_'+row+'_'+col+'"]').val(value);
            });
        },

        getValue: function(row, col){
            var value;

            this.each(function(){
                var $this = $(this),
                    settings = $this.data('input_matrix').settings;

                value = $this.find('input[name="'+settings.name+'_'+row+'_'+col+'"]').val();
            });

            return value;
        },

        getMatrixData: function(){
            var result = [];

            this.each(function(){
                var $this = $(this),
                    data = $this.data('input_matrix');

                data.input_matrix.find('tr').each(function(i){
                    var arr = [];
                    $(this).find('input[type="text"]').each(function(i2){
                        arr.push($(this).val());
                    });
                    result.push(arr);
                });
            });

            return result;
        },

        getRowData: function(row){
            var result = [];

            this.each(function(){
                var $this = $(this),
                    data = $this.data('input_matrix');

                data.input_matrix.find('tr').each(function(i){
                    if($(this).data('row_num') == row){
                        $(this).find('input[type="text"]').each(function(i2){
                            result.push($(this).val());
                        });
                    };
                });
            });

            return result;
        }
    };

    $.fn.inputMatrix = function(method){	
        if(methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }else if(typeof method === 'object' || ! method){
            return methods.init.apply(this, arguments);
        }else{
            $.error('Method ' +  method + ' does not exist on jQuery.inputMatrix');
        };
    };
})(jQuery);