Rails.application.routes.draw do
  resources :orders
  resources :products
  resources :categories
  devise_for :users
  resources :users
  root :to =>'users#signin'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
