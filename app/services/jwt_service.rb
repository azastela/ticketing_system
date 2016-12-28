class JWTService
  attr_reader :auth_token

  def initialize(auth_token = nil)
    @auth_token = auth_token
  end

  def encode(payload, expiration = nil)
    expiration ||= Rails.application.secrets.jwt_expiration_time

    payload = payload.dup
    payload['exp'] = expiration.to_i.hours.from_now.to_i

    @auth_token = payload
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def decode(token)
    @auth_token = begin
      decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base)
      decoded_token.first.with_indifferent_access
    rescue
      nil
    end
    self
  end

  def valid_token?
    auth_token && auth_token[:user_id] && auth_token['exp'] && !token_expired?
  end

  def token_expired?
    Time.at(auth_token['exp']) < Time.current
  end
end
