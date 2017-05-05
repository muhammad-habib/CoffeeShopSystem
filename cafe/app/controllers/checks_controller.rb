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
	render :json =>[@products]
  end

private
  def check_params
      params.require(:check).permit(:start_date, :end_date,:user_id)
    end
end

