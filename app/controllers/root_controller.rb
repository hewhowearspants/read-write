class RootController < ApplicationController
  def index
    render file: "#{Rails.root}/public/index.html"
  end
  
end