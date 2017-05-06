Rails.application.routes.draw do
  get 'checks/index'

  post 'checks/check'

  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
  resources :orders do
    collection do
      get 'manual'
    end
  end
  resources :products do
    member do
      get 'is_available'

    end
  end
  resources :categories
  devise_for :users , controllers: { sessions: 'auth' }
  resources :users
  root :to =>'orders#index'
  get '/myorders', to: "orders#myorders"
  get '/changeStatus', to: "orders#changeStatus"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end