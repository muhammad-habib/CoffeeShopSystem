class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :edit, :update, :destroy]

  # GET /orders
  # GET /orders.json
  def index
    if current_user.admin
      @orders = Order.all
    else
      return redirect_to myorders_path
    end
  end

  def myorders
    @start = selected_date(:start_date)
    @end = selected_date(:end_date)
    @orders = params[:search].present? ? Order.where(:created_at => @start..@end).where(:user_id => current_user.id) : Order.where(:user_id => current_user.id)
  end

  # GET /orders/1
  # GET /orders/1.json
  def show
  end

  # GET /orders/new
  def new
    @order = Order.new
    unless Order.all.empty?
      @latest=Order.last.products.all
    end
    @products=Product.where(:is_available => true)
    @rooms=User.all.collect(&:room)

    puts @rooms
  end

  # GET /orders/manual
  def manual
    @order = Order.new
    @users = User.all
    @products=Product.where(:is_available => true)
    @rooms=User.all.collect(&:room)


  end

  # GET /orders/1/edit
  def edit
    @products=Product.where(:is_available => true)
    @latest=Order.last.products.all
    @rooms=User.all.collect(&:room)
  end

  # POST /orders
  # POST /orders.json
  def create
    productsAmount = params[:product]
    params=order_params
    params[:user_id] = current_user.id
    @order = Order.new(params)
    respond_to do |format|
      if @order.save
        productsAmount.each do |key, value|
          orderProducts = OrdersProduct.new()
          puts '|||||||||||||||||||'
          puts value[:amount],value[:notes]
          orderProducts.product_id = key
          orderProducts.order_id = @order.id
          orderProducts.amount = value[:amount]
          orderProducts.notes = value[:notes]
          orderProducts.save
        end
        ActionCable.server.broadcast 'orders',
                                     order: @order.to_json,
                                     user: @order.user.to_json,
                                     products: @order.products.to_json,
                                     productsAmount: productsAmount,
                                     action:'add'
        format.html { redirect_to @order, notice: 'Order was successfully created.' }
        format.json { render :show, status: :created, location: @order }
      else
        format.html {render :new}
        format.json {render json: @order.errors, status: :unprocessable_entity}
      end
    end
  end

  # PATCH/PUT /orders/1
  # PATCH/PUT /orders/1.json
  def update
    respond_to do |format|
      if @order.update(order_params)
        format.html {redirect_to @order, notice: 'Order was successfully updated.'}
        format.json {render :show, status: :ok, location: @order}
      else
        format.html {render :edit}
        format.json {render json: @order.errors, status: :unprocessable_entity}
      end
    end
  end

  # DELETE /orders/1
  # DELETE /orders/1.json
  def destroy
    @order.destroy
    respond_to do |format|
      format.html {redirect_to myorders_path, notice: 'Order was successfully destroyed.'}
      format.json {head :no_content}
    end
    ActionCable.server.broadcast 'orders',
                                 order: @order.to_json,
                                 action:'delete'
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_order
    @order = Order.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def order_params
    params.require(:order).permit(:room)
  end

  def selected_date(symbol)
    params[:search].present? && params[:search][symbol].present? ? params[:search][symbol].to_date : Time.now.to_date
  end
end
