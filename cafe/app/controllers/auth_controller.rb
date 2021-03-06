class AuthController < Devise::SessionsController
  layout "application"

  # POST /resource/login
  def create
    super
  end

  def after_sign_in_path_for (users)
    cookies.signed[:user_id]= current_user.id
    orders_path
  end

  # GET /resource/sign_in
  def new
    super
  end
end