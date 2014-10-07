Rails.application.routes.draw do
  root 'landing#index'

  resources :users
  resources :submissions
  resources :sessions
  resources :identities
  resources :upvotes, only: :create
  resources :comments
  resources :submission_counts, only: :update
  resources :admin, only: :index
  resources :favorites, only: [:create, :destroy]
  resources :subscriptions, only: :create

  get 'user/:username' => 'users#show', as: 'username'
  get 'song/:flat_name' => 'submissions#show', as: 'submission_flat_name'
  get '/auth/twitter/callback', to: 'sessions#create', as: 'callback'
  get '/auth/failure', to: 'sessions#error', as: 'failure'
  get '/final_signup_step', to: 'users#final_signup_step', as: 'final_signup_step'
  get '/login', to: 'sessions#new', as: 'login'
  get '/signup', to: 'users#new', as: 'signup'
  get '/terms', to: 'landing#terms', as: 'terms'
  get '/faq', to: 'landing#faq', as: 'faq'
  get '/contact', to: 'landing#contact', as: 'contact'
  get '/top-10-edm-songs/:slug' => 'highlights#show', as: 'highlight_slug'

  # admin pages
  scope '/admin' do
    get 'approval_queue', to: 'admin#approval_queue', as: 'approval_queue'
    get 'users', to: 'admin#users', as: 'admin_users'
    get 'submissions', to: 'admin#submissions', as: 'admin_submissions'
    get 'rejects', to: 'admin#rejects', as: 'admin_rejects'
    resources :top_hits, only: [:index, :create]
  end

end
