module Api::V1
  class SessionsController < BaseController
    before_action :authenticate_request!, only: :destroy

    def create
      user = User.authenticate(user_params[:email], user_params[:password])
      return invalid_login_attempt unless user

      render json: {
        success: true,
        user: {
          id: user.id,
          auth_token: JWTService.new.encode(user_id: user.id),
          email: user.email,
          role: user.role
        }
      }
    end

    private

    def user_params
      params.require(:session).permit(:email, :password)
    end

    def invalid_login_attempt
      render json: {success: false, message: "Invalid email or password"}, status: :unauthorized
    end
  end
end
