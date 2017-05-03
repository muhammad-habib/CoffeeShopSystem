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
<<<<<<< HEAD
  root to: 'products#index'
=======
  root :to =>'users#index'
>>>>>>> 094012780d4ea3f1a2f52fe138a8287960f376cd
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
