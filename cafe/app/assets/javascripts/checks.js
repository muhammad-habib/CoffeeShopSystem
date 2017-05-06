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


function getChecksAll() {
	console.log('khaledgamal')
	var check_start_date=document.getElementById('checkallpost_start_date').value;	
	var check_end_date=document.getElementById('checkallpost_end_date').value;	
	var user_orders=document.getElementById('user_orders');	
	if(check_start_date ==null || check_end_date==null )
		return {"error":"please choose start date , end date and then the user"}
	var location='http://localhost:3000/'
	$.ajax({
		url: location+'checks/checkallpost',
		type: 'POST',
		beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		dataType: 'json',
		data: {checkallpost:{start_date: check_start_date , end_date:check_end_date}},
	})
	.done(function(response) {
		result='';
		res='';
		response.forEach( function(user_orders) {
			console.log(user_orders)
			if(user_orders!=null && user_orders[0].length>0){
				username=user_orders[1];
				result+='<div class="ui styled accordion">';
				tmp=user_orders[0][0].order_id;
				// order start tag
				res+='<div class="ui styled accordion">'
				res+='<div class="title active"><i class="dropdown icon"></i>'+" Order_Date  "+user_orders[0][0].created_at+"</div>";
				// order content tag
				res+='<div class="content active">';
				res+='<table  class="ui single line table"><thead><tr><th>Product Name</th><th>Product Price</th><th>Product Note</th><th>Product Amount</th></tr> </thead><tbody>';
				totalAmount=0;
				orderAmount=0;
				user_orders[0].forEach( function(product) {
					console.log(product)
					if(tmp!=product.order_id){
						res+='<tr><td colspan="4"> Total Order Amount Is:  '+orderAmount+' LE</td></tr>'
						res+='<tbody></table>'
						res+='</div>'
						res+='</div>'
						res+='<div class="ui styled accordion">'
						// order start tag
						res+='<div class="title "><i class="dropdown icon"></i>'+" Order_Date  "+Date(product.created_at)+"</div>";
						// order content tag
						res+='<div class="content ">';
						res+='<table  class="ui single line table"><thead><tr><th>Product Name</th><th>Product Price</th><th>Product Note</th><th>Product Amount</th></tr> </thead><tbody>';
						tmp=product.order_id
						orderAmount=0;
					}else{
						orderAmount+=Number(product.price)*Number(product.amount)
						totalAmount+=orderAmount
						res+='<tr>'
						res+='<td>'+product.name+'</td>'
						res+='<td>'+product.price+'</td>'
						res+='<td>'+product.notes+'</td>'
						res+='<td>'+product.amount+'</td>'
						res+='</tr>'
					}
				});
				res+='<tbody></table>'
				res+='</div>'
				res+='</div>'
			result+='<div class="title active"><i class="dropdown icon"></i><span style="float:left">'+username+"</span><span style='float:right'> Total Amount: "+totalAmount+' LE </span> </div><div class="content">'+res+"</div></div>";

			}
		});
		// result+="</div>"
		// user_orders.innerHTML=res
		user_orders.innerHTML=result+'<script type="text/javascript">'+ "$('.ui.accordion').accordion();"+'</script>';
	})
	.fail(function(response) {
		console.log(response);
	});
}


