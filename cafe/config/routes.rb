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

  resources :users
  root :to =>'orders#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
