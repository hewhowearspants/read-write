Rails.application.routes.draw do

  post "/login" => "sessions#create"
  delete "/logout" => "sessions#destroy"
  get "/profile" => "users#profile"

  resources :users
  resources :books
  resources :projects do
    resources :chapters
    resources :characters
    resources :locations
  end
end
