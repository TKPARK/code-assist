/**
 * Copyrightⓒ 2015 tkpark All rights reserved.
 */


function beautify() {
	const SPACE = ' ';
	
	// INPUT
	var source = document.getElementById('source').value;
	var lines = new Array();
	lines = source.split('\n');
	
	// OUTPUT
	var result = '';
	
	var valuesMaxLength = new Array();
	
	for(var i=0; i<lines.length; i++) {
		var line = trim(lines[i], 1);
		var isSkip = false;
		var result_line = '';
		
		// #newrow
		if(line.indexOf('type:"#newrow"') != -1 || line.indexOf('type:"#cspan"') != -1 || line.indexOf('type:"#rspan"') != -1) {
			
			if(line.substr(0, 1) == '{' && line.substr(line.length-2, line.length) == '},') {
				result_line = line.substr(1, line.length-3);
			} else {
				result_line = line.substr(1, line.length-2);
			}
			if(i == lines.length-1) {
				result = result + '{' + result_line + '}';
			} else {
				result = result + '{' + result_line + '},\n';
			}
			continue;
		}
		// { ... },
		else if(line.substr(0, 1) == '{' && line.substr(line.length-2, line.length) == '},') {
			line = line.substr(1, line.length-3);
		}
		// { ... }
		else if(line.substr(0, 1) == '{' && line.substr(line.length-1, line.length) == '}') {
			line = line.substr(1, line.length-2);
		}
		else {
			continue;
		}
		
		var tempNmFmt = '';
		// Exception handling - numberFormat
		if(line.indexOf('numberFormat') != -1) {
			var temp = line.substr(line.indexOf('numberFormat'), line.length);
			var idx1 = temp.indexOf('"') + 1; // 
			//console.log('temp: '+temp);
			
			var temp2 = temp.substr(temp.indexOf('"')+1, temp.length);
			var idx2 = temp2.indexOf('"') + 1;
			//console.log('temp2: '+temp2);
			
			tempNmFmt = temp.substr(0, idx1 + idx2);
			//console.log('tempNmFmt: '+tempNmFmt);
			
			var afTxt = temp.substr(idx1 + idx2, line.legth);
			//console.log('afTxt: '+afTxt);
			
			line = line.substr(0, line.indexOf('numberFormat')-1);
			//console.log('line: '+line);
			
			line = line + afTxt;
		}
		
		
		// ',' split
		var arr_attributes = line.split(',');
		if(tempNmFmt != '') {
			var size = arr_attributes.length;
			arr_attributes[size] = tempNmFmt;
			tempNmFmt = '';
		}
		

		var value = new Array();
		for(var j=0; j<arr_attributes.length; j++) {
			//console.log('arr_attributes[j]: '+arr_attributes[j]);
			
			// ':' split
			var arr_values = arr_attributes[j].split(':');
			value[j] = new Array(arr_values.length);
			
			for(var k=0; k<arr_values.length; k++) {
				if(k == 0) {
					if(arr_values[k] == 'colId') {
						value[j][k] = 'a_' + arr_values[k];
					} else if(arr_values[k] == 'label') {
						value[j][k] = 'b_' + arr_values[k];
					} else if(arr_values[k] == 'type') {
						value[j][k] = 'c_' + arr_values[k];
					} else if(arr_values[k] == 'width') {
						value[j][k] = 'd_' + arr_values[k];
					} else if(arr_values[k] == 'align') {
						value[j][k] = 'e_' + arr_values[k];
					} else if(arr_values[k] == 'minWidth') {
						value[j][k] = 'f_' + arr_values[k];
					} else if(arr_values[k] == 'sort') {
						value[j][k] = 'g_' + arr_values[k];
					} else if(arr_values[k] == 'updatable') {
						value[j][k] = 'h_' + arr_values[k];
					} else if(arr_values[k] == 'dd') {
						value[j][k] = 'i_' + arr_values[k];
					} else if(arr_values[k] == 'mask') {
						value[j][k] = 'j_' + arr_values[k];
					} else if(arr_values[k] == 'numberFormat') {
						value[j][k] = 'k_' + arr_values[k];
					} else {
						value[j][k] = 'z_' + arr_values[k];
					}
				} else {
					value[j][k] = arr_values[k];
				}
				//console.log('value['+j+']['+k+']: '+value[j][k]);
			}
		}
		
		// sort
		value.sort(function(a1, a2) {
			var idx = 0;
			//a1[idx] = a1[idx].toString().toLowerCase();
			//a2[idx] = a2[idx].toString().toLowerCase();
			
			return (a1[idx]<a2[idx]) ? -1 : ((a1[idx]>a2[idx]) ? 1 : 0);
		});
		
		// 
		for(var j=0; j<value.length; j++) {
			for(var k=0; k<value[j].length; k++) {
				if(k == 0) {
					value[j][k] = value[j][k].substr(2, value[j][k].length);
				}
				//console.log('value['+j+']['+k+']: '+value[j][k]);
				
				if(k == value[j].length-1) {
					result_line = result_line + value[j][k];
				} else {
					result_line = result_line + value[j][k] + ':';
				}
				
				if(k == 1) {
					if(valuesMaxLength[j] == null) {
						valuesMaxLength[j] = value[j][k].length;
					} else {
						valuesMaxLength[j] = value[j][k].length > valuesMaxLength[j] ? value[j][k].length : valuesMaxLength[j];
					}
					//console.log('valuesMaxLength[j]: '+valuesMaxLength[j]);
				}
			}
			if(j != value.length-1) {
				result_line = result_line + ', ';
			}
		}
		
		if(i == lines.length-1) {
			result = result + '{' + result_line + '}';
		} else {
			result = result + '{' + result_line + '},\n';
		}
	}
	
	//
	lines = result.split('\n');
	result = '';
	for(var i=0; i<lines.length; i++) {
		var line = trim(lines[i], 1);
		var isSkip = false;
		var result_line = '';
		
		// #newrow
		if(line.indexOf('type:"#newrow"') != -1 || line.indexOf('type:"#cspan"') != -1 || line.indexOf('type:"#rspan"') != -1) {
			
			if(line.substr(0, 1) == '{' && line.substr(line.length-2, line.length) == '},') {
				result_line = line.substr(1, line.length-3);
			} else {
				result_line = line.substr(1, line.length-2);
			}
			if(i == lines.length-1) {
				result = result + '{' + result_line + '}';
			} else {
				result = result + '{' + result_line + '},\n';
			}
			continue;
		}
		// { ... },
		else if(line.substr(0, 1) == '{' && line.substr(line.length-2, line.length) == '},') {
			line = line.substr(1, line.length-3);
		}
		// { ... }
		else if(line.substr(0, 1) == '{' && line.substr(line.length-1, line.length) == '}') {
			line = line.substr(1, line.length-2);
		}
		else {
			continue;
		}
		
		var tempNmFmt = '';
		// Exception handling - numberFormat
		if(line.indexOf('numberFormat') != -1) {
			var temp = line.substr(line.indexOf('numberFormat'), line.length);
			var idx1 = temp.indexOf('"') + 1; // 
			//console.log('temp: '+temp);
			
			var temp2 = temp.substr(temp.indexOf('"')+1, temp.length);
			var idx2 = temp2.indexOf('"') + 1;
			//console.log('temp2: '+temp2);
			
			tempNmFmt = temp.substr(0, idx1 + idx2);
			//console.log('tempNmFmt: '+tempNmFmt);
			
			var afTxt = temp.substr(idx1 + idx2, line.legth);
			//console.log('afTxt: '+afTxt);
			
			line = line.substr(0, line.indexOf('numberFormat')-1);
			//console.log('line: '+line);
			
			line = line + afTxt;
		}
		
		
		// ',' split
		var arr_attributes = line.split(',');
		if(tempNmFmt != '') {
			var size = arr_attributes.length;
			arr_attributes[size] = tempNmFmt;
			tempNmFmt = '';
		}
		
		var value = new Array();
		for(var j=0; j<arr_attributes.length; j++) {
			//console.log('arr_attributes[j]: '+arr_attributes[j]);
			
			// ':' split
			var arr_values = arr_attributes[j].split(':');
			value[j] = new Array(arr_values.length);
			
			for(var k=0; k<arr_values.length; k++) {
				value[j][k] = arr_values[k];
			}
		}
		
		for(var j=0; j<value.length; j++) {
			for(var k=0; k<value[j].length; k++) {
				if(k == value[j].length-1) {
					result_line = result_line + value[j][k];
					if(j != value.length-1) {
						result_line = result_line + ', ';
					}
				} else {
					result_line = result_line + value[j][k] + ':';
				}
				
				if(k == 1) {
					if(value[j][0] == 'colId' || value[j][0] == 'label' || value[j][0] == 'type' || value[j][0] == 'width' || value[j][0] == 'align') {
						var diff = valuesMaxLength[j] - value[j][k].length;
						//console.log('diff: '+diff);
						for(var d=0; d<diff; d++) {
							result_line = result_line + SPACE;
						}
					}
				}
			}
			/*if(j != value.length-1) {
				result_line = result_line + ', ';
			}*/
		}
		
		if(i == lines.length-1) {
			result = result + '{' + result_line + '}';
		} else {
			result = result + '{' + result_line + '},\n';
		}
	}
	//
	document.getElementById('result').value = result;
	console.log('result: ' + result);
}


function trimAndSort() {
	
	// INPUT
	var source = document.getElementById('source').value;
	var lines = new Array();
	lines = source.split('\n');
	
	// OUTPUT
	var result = '';
	
	for(var i=0; i<lines.length; i++) {
		var line = trim(lines[i], 1);
		var isSkip = false;
		var result_line = '';
		
		// #newrow
		if(line.indexOf('#newrow') != -1) {
			result_line = line.substr(1, line.length-3);
			if(i == lines.length-1) {
				result = result + '{' + result_line + '}';
			} else {
				result = result + '{' + result_line + '},\n';
			}
			continue;
		}
		// #cspan
		else if(line.indexOf('#cspan') != -1) {
			result_line = line.substr(1, line.length-3);
			if(i == lines.length-1) {
				result = result + '{' + result_line + '}';
			} else {
				result = result + '{' + result_line + '},\n';
			}
			continue;
		}
		// #rspan
		else if(line.indexOf('#rspan') != -1) {
			result_line = line.substr(1, line.length-3);
			if(i == lines.length-1) {
				result = result + '{' + result_line + '}';
			} else {
				result = result + '{' + result_line + '},\n';
			}
			continue;
		}
		// { ... },
		else if(line.substr(0, 1) == '{' && line.substr(line.length-2, line.length) == '},') {
			line = line.substr(1, line.length-3);
		}
		// { ... }
		else if(line.substr(0, 1) == '{' && line.substr(line.length-1, line.length) == '}') {
			line = line.substr(1, line.length-2);
		}
		else {
			continue;
		}
		
		var tempNmFmt = '';
		// Exception handling - numberFormat
		if(line.indexOf('numberFormat') != -1) {
			var temp = line.substr(line.indexOf('numberFormat'), line.length);
			var idx1 = temp.indexOf('"') + 1; // 
			//console.log('temp: '+temp);
			
			var temp2 = temp.substr(temp.indexOf('"')+1, temp.length);
			var idx2 = temp2.indexOf('"') + 1;
			//console.log('temp2: '+temp2);
			
			tempNmFmt = temp.substr(0, idx1 + idx2);
			//console.log('tempNmFmt: '+tempNmFmt);
			
			var afTxt = temp.substr(idx1 + idx2, line.legth);
			//console.log('afTxt: '+afTxt);
			
			line = line.substr(0, line.indexOf('numberFormat')-1);
			//console.log('line: '+line);
			
			line = line + afTxt;
		}
		
		
		// ',' split
		var arr_attributes = line.split(',');
		if(tempNmFmt != '') {
			var size = arr_attributes.length;
			arr_attributes[size] = tempNmFmt;
			tempNmFmt = '';
		}
		

		var value = new Array();
		for(var j=0; j<arr_attributes.length; j++) {
			//console.log('arr_attributes[j]: '+arr_attributes[j]);
			
			// ':' split
			var arr_values = arr_attributes[j].split(':');
			value[j] = new Array(arr_values.length);
			
			for(var k=0; k<arr_values.length; k++) {
				if(k == 0) {
					if(arr_values[k] == 'colId') {
						value[j][k] = 'a_' + arr_values[k];
					} else if(arr_values[k] == 'label') {
						value[j][k] = 'b_' + arr_values[k];
					} else if(arr_values[k] == 'type') {
						value[j][k] = 'c_' + arr_values[k];
					} else if(arr_values[k] == 'width') {
						value[j][k] = 'd_' + arr_values[k];
					} else if(arr_values[k] == 'align') {
						value[j][k] = 'e_' + arr_values[k];
					} else if(arr_values[k] == 'minWidth') {
						value[j][k] = 'f_' + arr_values[k];
					} else if(arr_values[k] == 'sort') {
						value[j][k] = 'g_' + arr_values[k];
					} else if(arr_values[k] == 'updatable') {
						value[j][k] = 'h_' + arr_values[k];
					} else if(arr_values[k] == 'dd') {
						value[j][k] = 'i_' + arr_values[k];
					} else if(arr_values[k] == 'mask') {
						value[j][k] = 'j_' + arr_values[k];
					} else if(arr_values[k] == 'numberFormat') {
						value[j][k] = 'k_' + arr_values[k];
					} else {
						value[j][k] = 'z_' + arr_values[k];
					}
				} else {
					value[j][k] = arr_values[k];
				}
				//console.log('value['+j+']['+k+']: '+value[j][k]);
			}
		}
		
		// sort
		value.sort(function(a1, a2) {
			var idx = 0;
			//a1[idx] = a1[idx].toString().toLowerCase();
			//a2[idx] = a2[idx].toString().toLowerCase();
			
			return (a1[idx]<a2[idx]) ? -1 : ((a1[idx]>a2[idx]) ? 1 : 0);
		});
		
		// 
		for(var j=0; j<value.length; j++) {
			for(var k=0; k<value[j].length; k++) {
				if(k == 0) {
					value[j][k] = value[j][k].substr(2, value[j][k].length);
				}
				//console.log('value['+j+']['+k+']: '+value[j][k]);
				
				if(k == value[j].length-1) {
					result_line = result_line + value[j][k];
				} else {
					result_line = result_line + value[j][k] + ':';
				}
			}
			if(j != value.length-1) {
				result_line = result_line + ', ';
			}
		}
		
		if(i == lines.length-1) {
			result = result + '{' + result_line + '}';
		} else {
			result = result + '{' + result_line + '},\n';
		}
	}
	document.getElementById('result').value = result;
	console.log('result: ' + result);
}




function test2() {
	const ATTRIBUTES = ['colId', 'label', 'type', 'width', 'align', 'minWidth', 'sort', 'updatable', 'dd', 'mask', 'numberFormat'];
	const SPACE = ' ';
	
	// INPUT
	var source = document.getElementById('source').value;
	var lines = new Array();
	lines = source.split('\n');
	////console.log('source: '+source);
	
	// OUTPUT
	var result = '';
	var output = '';
	var output_line = '';
	
	// 
	var txtNmFmt = '';
	var isSkip = false;
	var valuesMaxLength = new Array();
	
	for(var i=0; i<lines.length; i++) {
		var line = trim(lines[i], 1);
		//////console.log('line: '+line);
		
		// #newrow
		if(line.indexOf('#newrow') != -1) {
			isSkip = true;
		}
		// { ... },
		else if(line.substr(0, 1) == '{' && line.substr(line.length-2, line.length) == '},') {
			//////console.log('{ ... },');
			//////console.log(line.substr(1, line.length-3));
			
			line = line.substr(1, line.length-3);
		}
		// { ... }
		else if(line.substr(0, 1) == '{' && line.substr(line.length-1, line.length) == '}') {
			//////console.log('{ ... }');
			//////console.log(line.substr(1, line.length-2));
			
			line = line.substr(1, line.length-2);
		}
		else {
			continue;
		}
		////console.log('line: '+line);
		
		if(isSkip == false) {
			//
			// Exception handling - numberFormat
			if(line.indexOf('numberFormat') != -1) {
				////console.log('line.indexOf(numberFormat): '+ line.indexOf('numberFormat'));
				
				var temp = line.substr(line.indexOf('numberFormat'), line.length);
				
				
				////console.log('temp: '+ temp);
				
				////console.log('temp.indexOf("): '+ temp.indexOf('"'));
				var stNmFmt = temp.indexOf('"') + 1;
				
				var temp2 = temp.substr(temp.indexOf('"')+1, temp.length);
				////console.log('temp2.indexOf("): '+ temp2.indexOf('"'));
				var endNmFmt = temp2.indexOf('"') + 1;
				
				txtNmFmt = temp.substr(0, stNmFmt+endNmFmt);
				////console.log('txtNmFmt: '+ txtNmFmt);
				
				var afTxt = temp.substr(stNmFmt+endNmFmt+1, line.legth);
				
				line = line.substr(0, line.indexOf('numberFormat')-1);
				////console.log('line1: '+ line);
				
				line = line + afTxt;
				////console.log('line2: '+ line);
			}
			
			
			// ',' split
			var arr_attributes = line.split(',');
			if(txtNmFmt != '') {
				var size = arr_attributes.length;
				arr_attributes[size] = txtNmFmt;
				txtNmFmt = '';
			}
			
			var value = new Array();
			for(var j=0; j<arr_attributes.length; j++) {
				////console.log('arr_attributes['+j+']:'+arr_attributes[j]);
				result = result + arr_attributes[j];
				
				// ':' split
				var arr_values = arr_attributes[j].split(':');
				//var value = new Array(arr_values.length);
				value[j] = new Array(arr_values.length);
				
				for(var k=0; k<arr_values.length; k++) {
					if(k == 0) {
						
						if(arr_values[k] == 'colId') {
							value[j][k] = 'a_' + arr_values[k];
						} else if(arr_values[k] == 'label') {
							value[j][k] = 'b_' + arr_values[k];
						} else if(arr_values[k] == 'type') {
							value[j][k] = 'c_' + arr_values[k];
						} else if(arr_values[k] == 'width') {
							value[j][k] = 'd_' + arr_values[k];
						} else if(arr_values[k] == 'align') {
							value[j][k] = 'e_' + arr_values[k];
						} else if(arr_values[k] == 'minWidth') {
							value[j][k] = 'f_' + arr_values[k];
						} else if(arr_values[k] == 'sort') {
							value[j][k] = 'g_' + arr_values[k];
						} else if(arr_values[k] == 'updatable') {
							value[j][k] = 'h_' + arr_values[k];
						} else if(arr_values[k] == 'dd') {
							value[j][k] = 'i_' + arr_values[k];
						} else if(arr_values[k] == 'mask') {
							value[j][k] = 'j_' + arr_values[k];
						} else if(arr_values[k] == 'numberFormat') {
							value[j][k] = 'k_' + arr_values[k];
						} else {
							value[j][k] = 'z_' + arr_values[k];
						}
					} else {
						value[j][k] = arr_values[k];
					}
					//////console.log('value['+j+']['+k+']: '+value[j][k]);
				}
			}
			
			
			// sort
			value.sort(function(a1, a2) {
				var idx = 0;
				a1[idx] = a1[idx].toString().toLowerCase();
				a2[idx] = a2[idx].toString().toLowerCase();
				
				return (a1[idx]<a2[idx]) ? -1 : ((a1[idx]>a2[idx]) ? 1 : 0);
			});
			////console.log("sort!!!!!!!");
			
			for(var j=0; j<value.length; j++) {
				for(var k=0; k<value[j].length; k++) {
					if(k == 0) {
						value[j][k] = value[j][k].substr(2, value[j][k].length);
					}
					////console.log('value['+j+']['+k+']: '+value[j][k]);
					
					if(k == value[j].length-1) {
						output_line = output_line + value[j][k];
					} else {
						output_line = output_line + value[j][k] + ':';
					}
					
					if(k == 1) {
						if(valuesMaxLength[j] == null) {
							valuesMaxLength[j] = value[j][k].length;
						} else {
							valuesMaxLength[j] = value[j][k].length > valuesMaxLength[j] ? value[j][k].length : valuesMaxLength[j];
						}
					}
				}
				if(j != value.length-1) {
					output_line = output_line + ', ';
				}
			}
			//
		} else {
			output_line = line;
		}
		
		if(i == lines.length-1) {
			output = output + '{' + output_line + '}';
		} else {
			output = output + '{' + output_line + '},\n';
		}
		output_line = '';
		isSkip = false;
	}
	
	
	//
	//
	//
	output = '';
	output_line = '';
	for(var i=0; i<lines.length; i++) {
		var line = trim(lines[i], 1);
		//////console.log('line: '+line);
		
		// #newrow
		if(line.indexOf('#newrow') != -1) {
			isSkip = true;
		}
		// { ... },
		if(line.substr(0, 1) == '{' && line.substr(line.length-2, line.length) == '},') {
			//////console.log('{ ... },');
			//////console.log(line.substr(1, line.length-3));
			
			line = line.substr(1, line.length-3);
		}
		// { ... }
		else if(line.substr(0, 1) == '{' && line.substr(line.length-1, line.length) == '}') {
			//////console.log('{ ... }');
			//////console.log(line.substr(1, line.length-2));
			
			line = line.substr(1, line.length-2);
		}
		else {
			continue;
		}
		////console.log('line: '+line);
		
		if(isSkip == false) {
			//
			// Exception handling - numberFormat
			if(line.indexOf('numberFormat') != -1) {
				////console.log('line.indexOf(numberFormat): '+ line.indexOf('numberFormat'));
				
				var temp = line.substr(line.indexOf('numberFormat'), line.length);
				
				
				////console.log('temp: '+ temp);
				
				////console.log('temp.indexOf("): '+ temp.indexOf('"'));
				var stNmFmt = temp.indexOf('"') + 1;
				
				var temp2 = temp.substr(temp.indexOf('"')+1, temp.length);
				////console.log('temp2.indexOf("): '+ temp2.indexOf('"'));
				var endNmFmt = temp2.indexOf('"') + 1;
				
				txtNmFmt = temp.substr(0, stNmFmt+endNmFmt);
				////console.log('txtNmFmt: '+ txtNmFmt);
				
				var afTxt = temp.substr(stNmFmt+endNmFmt+1, line.legth);
				
				line = line.substr(0, line.indexOf('numberFormat')-1);
				////console.log('line1: '+ line);
				
				line = line + afTxt;
				////console.log('line2: '+ line);
			}
			
			
			// ',' split
			var arr_attributes = line.split(',');
			if(txtNmFmt != '') {
				var size = arr_attributes.length;
				arr_attributes[size] = txtNmFmt;
				txtNmFmt = '';
			}
			
			var value = new Array();
			for(var j=0; j<arr_attributes.length; j++) {
				////console.log('arr_attributes['+j+']:'+arr_attributes[j]);
				result = result + arr_attributes[j];
				
				// ':' split
				var arr_values = arr_attributes[j].split(':');
				//var value = new Array(arr_values.length);
				value[j] = new Array(arr_values.length);
				
				for(var k=0; k<arr_values.length; k++) {
					if(k == 0) {
						
						if(arr_values[k] == 'colId') {
							value[j][k] = 'a_' + arr_values[k];
						} else if(arr_values[k] == 'label') {
							value[j][k] = 'b_' + arr_values[k];
						} else if(arr_values[k] == 'type') {
							value[j][k] = 'c_' + arr_values[k];
						} else if(arr_values[k] == 'width') {
							value[j][k] = 'd_' + arr_values[k];
						} else if(arr_values[k] == 'align') {
							value[j][k] = 'e_' + arr_values[k];
						} else if(arr_values[k] == 'minWidth') {
							value[j][k] = 'f_' + arr_values[k];
						} else if(arr_values[k] == 'sort') {
							value[j][k] = 'g_' + arr_values[k];
						} else if(arr_values[k] == 'updatable') {
							value[j][k] = 'h_' + arr_values[k];
						} else if(arr_values[k] == 'dd') {
							value[j][k] = 'i_' + arr_values[k];
						} else if(arr_values[k] == 'mask') {
							value[j][k] = 'j_' + arr_values[k];
						} else if(arr_values[k] == 'numberFormat') {
							value[j][k] = 'k_' + arr_values[k];
						} else {
							value[j][k] = 'z_' + arr_values[k];
						}
					} else {
						value[j][k] = arr_values[k];
					}
					//////console.log('value['+j+']['+k+']: '+value[j][k]);
				}
			}
			
			// sort
			value.sort(function(a1, a2) {
				var idx = 0;
				a1[idx] = a1[idx].toString().toLowerCase();
				a2[idx] = a2[idx].toString().toLowerCase();
				
				return (a1[idx]<a2[idx]) ? -1 : ((a1[idx]>a2[idx]) ? 1 : 0);
			});
			////console.log("sort!!!!!!!");
			
			
			for(var j=0; j<value.length; j++) {
				for(var k=0; k<value[j].length; k++) {
					if(k == 0) {
						value[j][k] = value[j][k].substr(2, value[j][k].length);
					}
					////console.log('value['+j+']['+k+']: '+value[j][k]);
					
					if(k == value[j].length-1) {
						output_line = output_line + value[j][k];
					} else {
						output_line = output_line + value[j][k] + ':';
					}
					
					if(k == 1) {
						if(value[j][0] == 'colid' || value[j][0] == 'label' || value[j][0] == 'type' || value[j][0] == 'width' || value[j][0] == 'align') {
							var diff = valuesMaxLength[j] - value[j][k].length;
							for(var d=0; d<diff; d++) {
								output_line = output_line + SPACE;
							}
						}
					}
				}
				if(j != value.length-1) {
					output_line = output_line + ', ';
				}
			}
			//
		} else {
			output_line = line;
		}
		
		if(i == lines.length-1) {
			output = output + '{' + output_line + '}';
		} else {
			output = output + '{' + output_line + '},\n';
		}
		output_line = '';
		isSkip = false;
	}
	
	////console.log('result:'+output);
	document.getElementById('result').value = output;
}


function test1() {
	const SPACE = ' ';
	
	// INPUT
	var source = document.getElementById('source').value;
	var lines = new Array();
	////console.log('source:'+source);
	
	// OUTPUT
	var result = '';
	var valuesMaxLength = new Array();
	
	lines = source.split('\n');
	for(var i=0; i<lines.length; i++) {
		var line = trim(lines[i], 1);
		
		////console.log('line:'+line);
		
		var values = line.split(',');
		for(var j=0; j<values.length; j++) {
			////console.log('values['+j+']:'+values[j]+', length:'+values[j].length);
			
			if(valuesMaxLength[j] == null) {
				valuesMaxLength[j] = values[j].length;
				//////console.log('1.valuesMaxLength['+j+']:'+valuesMaxLength[j]);
			} else {
				valuesMaxLength[j] = values[j].length > valuesMaxLength[j] ? values[j].length : valuesMaxLength[j];
				//////console.log('2.valuesMaxLength['+j+']:'+valuesMaxLength[j]);
			}
		}
	}
	
	////console.log('valuesMaxLength:'+valuesMaxLength.length);
	for(var j=0; j<valuesMaxLength.length; j++) {
		////console.log('valuesMaxLength['+j+'] length:'+valuesMaxLength[j]);
	}
	
	
	for(var i=0; i<lines.length; i++) {
		var line = trim(lines[i], 1);
		var values = line.split(',');
		
		for(var j=0; j<values.length; j++) {
			var diff = valuesMaxLength[j] - values[j].length;
			
			if(values[j].length == 0) {
				continue;
			}
			
			////console.log('in  values[j]:'+values[j]);
			
			for(var d=0; d<diff; d++) {
				values[j] = values[j] + SPACE;
			}
			////console.log('out values[j]:'+values[j]);
			
			result = result + values[j] + ', ';
		}
		result = result + '\n';
	}
	
	////console.log('result:'+result);
	document.getElementById('result').value = result;
}


/**
 * 공백제거
 * @param str
 * @param value : 1.전체 공백제거, 2.앞,뒤 공백제거
 */
function trim(str, value) {
  if(value == 1) {
    return str.replace(/(\s*)/g, ''); // 전체 공백제거
  }else {
    return str.replace(/^\s*|\s*$/g, ''); // 앞,뒤 공백제거
  }
}