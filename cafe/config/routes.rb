Rails.application.routes.draw do
  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
  resources :orders
  resources :products do
    member do
      get 'is_available'
    end
  end
  resources :categories
  devise_for :users

  root to: 'products#index'

  #root :to =>'users#index'

end
