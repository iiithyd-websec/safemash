$(document).ready(function(){

	var baseUrl=$('#hdnBaseUrl').val();
	//var baseUrl='http://safemash.herokuapp.com';

	$m('#divGmap').createWidget({ 
		id: 'gmapsWidget', 
		loadPage: baseUrl+'/gmaps'
	});

	$m('#divFlickr').createWidget({ 
		id: 'flickrWidget', 
		loadPage: baseUrl+'/flickr'
	});

	$m('#divCustomize').createWidget({
		loadPage: '/customize',
		sandboxFlags: 'allow-scripts allow-same-origin'
	});

});
