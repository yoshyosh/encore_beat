Rails.application.routes.draw do
  root 'landing#index'

  resources :users
  resources :submissions
  resources :sessions
  resources :identities
  resources :upvotes
  resources :comments
  resources :submission_counts, only: :update
  resources :admin, only: :index

  get 'user/:username' => 'users#show', as: 'username'
  get 'song/:flat_name' => 'submissions#show', as: 'submission_flat_name'
  get '/auth/twitter/callback', to: 'sessions#create', as: 'callback'
  get '/auth/failure', to: 'sessions#error', as: 'failure'
  get '/final_signup_step', to: 'users#final_signup_step', as: 'final_signup_step'
  get '/login', to: 'sessions#new', as: 'login'
  get '/signup', to: 'users#new', as: 'signup'
  get '/terms', to: 'landing#terms', as: 'terms'
  get '/faq', to: 'landing#faq', as: 'faq'

  # admin pages
  get '/admin/approval_queue', to: 'admin#approval_queue', as: 'approval_queue'
  get '/admin/users', to: 'admin#users'
  get '/admin/submissions', to: 'admin#submissions'
end
