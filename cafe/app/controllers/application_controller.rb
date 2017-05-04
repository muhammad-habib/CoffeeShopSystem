class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!


  def isAdmin
    if current_user.try(:admin?)
    else
      redirect_to orders_path
    end
  end

end