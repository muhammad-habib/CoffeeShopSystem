class ChecksController < ApplicationController
  # before_action :checks_params, only: [:check]

  def index
  end

  def check
  	data=params.require(:check).permit(:start_date, :end_date,:user_id)
  	print(data)
    if data 
     	@orders = Order.where('date(created_at)>=? AND date(created_at)<=? AND user_id=?',data[:start_date],data[:end_date],data[:user_id]);
		@products=[]     	
     	@orders.each{|order|
     		pro=OrdersProduct.find_by_sql("SELECT o.* , p.name , p.price FROM orders_products o
				INNER JOIN products p ON p.id= o.product_id
                WHERE o.order_id= #{order.id}")
            @products << pro    	
     	}
		# @orders=OrdersProduct.find_by_sql("SELECT o.* , p.name , p.price FROM orders_products o
		# 		INNER JOIN products p ON p.id= o.product_id
		# 		WHERE DATE(o.created_at)>=#{data[:start_date]} AND DATE(o.created_at) <= #{data[:end_date]}")
 	else
 		@orders=[]
 	 end
	render :json =>@products
  end

  def checkallget


  end

  def checkallpost
  	data=params.require(:checkallpost).permit(:start_date, :end_date)
    if data 
     	@orders = Order.find_by_sql("SELECT o.* , u.username , u.email FROM orders o join users u on u.id=o.user_id WHERE DATE(o.created_at) BETWEEN '#{data[:start_date]}' AND '#{data[:end_date]}' ");
		@products=[]     	
     	@orders.each{|order|
     		print("***************************** #{order.user_id}  ************************")
     		pro=OrdersProduct.find_by_sql("SELECT o.* , p.name , p.price FROM orders_products o
				INNER JOIN products p ON p.id= o.product_id
                WHERE o.order_id= #{order.id}")
     		if @products.empty?
     			@products [order.user_id] = [pro,order.username]    	
 			else
	     		if @products[order.user_id].nil?
	            	@products[order.user_id]= [pro,order.username ]    	
	     		else	
	     			if @products[order.user_id][0].blank?
	 					@products[order.user_id][0]=pro
	 				else
	 					pro.each{|p| @products[order.user_id][0] << p}
					end
	        	end
        	end
     	}
 	else
 		@products=[]
 	 end
	render :json =>@products

  end

private
  def check_params
      params.require(:check).permit(:start_date, :end_date)
    end
end

