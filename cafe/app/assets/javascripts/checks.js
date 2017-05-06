function getChecks(){
	var check_start_date=document.getElementById('check_start_date').value;	
	var check_end_date=document.getElementById('check_end_date').value;	
	var _id=document.getElementById('check_user_id').value;	
	var user_orders=document.getElementById('user_orders');	
	if(check_start_date ==null || check_end_date==null || _id==null)
		return {"error":"please choose start date , end date and then the user"}
	var location='http://localhost:3000/'
	$.ajax({
		url: location+'checks/check',
		type: 'POST',
		beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		dataType: 'json',
		data: {check:{start_date: check_start_date , end_date:check_end_date, user_id:_id}},
	})
	.done(function(response) {
		// result='';
		result='<table  class="ui single line table"><thead><tr><th>Order ID</th><th>Order Date</th><th>Product Name</th><th>Product Cost</th><th>Product Amount</th></tr> </thead><tbody>';
		response.forEach(function (product_order) {
			product_order.forEach( function(element,index) {
				console.log('order#'+index)
				// result+='<div> Order# '+index+'<br /> ';
				element.forEach( function(product) {
					result+='<tr>';
					link=location+'orders/'+product.order_id
					result+='<td>'+'<a href="'+link+'">'+product.order_id+'</a></td>'
					result+='<td>'+product.created_at+'</td>'
					result+='<td>'+product.name+'</td>'
					result+='<td>'+product.price+' LE '+'</td>'
					result+='<td>'+product.amount+'</td>'
				result+='</tr>';
					// result+="Product Name: "+product.name+'<br /> '+"Product Price: "+product.price+'<br /> ';
					// result+="Product Amount: "+product.amount+'<br /> '
				});
				// result+='</div><hr />';
			});
			
		})
		result+="</tbody></table>"
		console.log(result)
		user_orders.innerHTML=result
	})
	.fail(function(response) {
		console.log(response);
	});
	
}

