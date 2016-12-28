module Api::V1
  class BaseController < ActionController::API
    before_action :authenticate_request!

    include Pundit

    rescue_from Exception, with: :common_exception_handler
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
    rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error

    private

    def common_exception_handler(exception)
      render json: {success: false, message: exception.message}, status: :internal_server_error
    end

    def user_not_authorized(exception)
      render json: {success: false, message: 'Not Authorized'}, status: :unauthorized
    end

    def handle_validation_error(exception)
      render json: {success: false, message: exception.message}, status: :bad_request
    end

    def authenticate_request!
      render_unauthorized unless jwt_service.valid_token?
    rescue JWT::VerificationError, JWT::DecodeError
      render_unauthorized
    end

    def current_user
      @current_user ||= User.find(jwt_service.auth_token[:user_id])
    end

    def render_unauthorized
      render json: {success: false, message: 'Not Authenticated'}, status: :unauthorized
    end

    def http_token
      @http_token ||= begin
        auth = request.headers['Authorization'].presence || request.params[:access_token]
        token = auth['bearer '.length..-1] if auth
      end
    end

    def jwt_service
      @jwt_service ||= JWTService.new.decode(http_token)
    end
  end
end
