module Api::V1
  class UsersController < BaseController
    before_action :set_user, only: %i(destroy update edit)
    before_action :authorize_user, except: %i(index create)

    def index
      authorize User
      @users = User.not_admin.all + [current_user]
    end

    def create
      @user = User.new(user_params)
      authorize @user
      @user.save!
    end

    def edit
    end

    def update
      @user.update!(user_params)
    end

    def destroy
      @user.destroy
    end

    private

    def set_user
      @user = User.find(params[:id])
    end

    def authorize_user
      authorize @user
    end

    def user_params
      params.require(:user).permit(:email, :role, :password, :password_confirmation)
    end
  end
end
