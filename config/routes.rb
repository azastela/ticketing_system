Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'sign_in' => 'sessions#create'
      delete 'sign_out' => 'sessions#destroy'
      resources :users, only: %i(index create update destroy edit)
      resources :tickets, only: %i(index show create update destroy new) do
        get :report, on: :collection
        resources :comments, only: %i(index create destroy)
      end
    end
  end
end
