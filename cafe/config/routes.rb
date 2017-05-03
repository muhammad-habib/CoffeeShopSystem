Rails.application.routes.draw do
  resources :orders
  resources :products do
    member do
      get 'is_available'
    end
  end
  resources :categories
  devise_for :users
  root to: 'products#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
