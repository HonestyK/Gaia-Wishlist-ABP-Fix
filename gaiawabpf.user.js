// ==UserScript==
// @name          Gaia Wishlist ABP fix
// @version        0.2
// @description   Changes the values for the wishlist ABP in the marketplace to the one used in the Avatar Builder.
// @author         Honesty Kruse @ Gaia Online
// @match          http://www.gaiaonline.com/marketplace/
// @grant           unsafeWindow
// @run-at          document-end
// @require        https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==


equipidmethod();
// avibuildermethod();


// NOTES:
// avibuildermethod is faster than equipidmethod but uses more code and WON'T work if avi builder is down.
function avibuildermethod() {
	
	//to hold list of item ids
	var idlist = "";
	
	// get ids
	$('#wishlist .itemDescription a').each(function() {
		var thisurl = $(this).attr('href').split("/");
		idlist = idlist + thisurl[3] + ",";
	});
	
	// remove last comma
	idlist = idlist.substring(0,idlist.length - 1);

	// get list of abp and replace in wishlist
	$.getJSON('/avibuilder/getmarketdetails/?list='+idlist, function (data) {
			if (data.success == 1)
				{
					$.each(data.item, function(index, elem) {
						$('#wishlist .buyNowPrice').eq(index).html(elem.avg_price + "g");
					});
				}
	});
}

// NOTES:
// equipidmethod is slower than avibuildermethod due to having to make mutilple requests instead of one, but uses less code and WILL work if avi builder is down.
function equipidmethod() {
	$('#wishlist .itemDescription a').each(function(index) {
	
		var idget = $(this).attr('href').split("/");
		
		$.get( '/equip/id/' + idget[3], function(data) {
		  var itemdata = eval(data);
		  $('#wishlist .buyNowPrice').eq(index).html(itemdata.averages + "g");
		});
	});
}