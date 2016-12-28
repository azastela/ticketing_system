require 'rails_helper'

RSpec.describe User, type: :model do
  it { is_expected.to respond_to(:email) }
  it { is_expected.to respond_to(:role) }
  it { is_expected.to respond_to(:encrypted_password) }

  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_uniqueness_of(:email) }

  context 'instance methods' do
    let(:password){ 'foobar123' }
    let!(:user){ create :user, password: password }

    describe '#encrypt_password' do
      it 'correctly encrypts password' do
        expect(user.encrypted_password).to eq BCrypt::Engine.hash_secret(password, user.salt)
      end
    end
  end

  context 'class methods' do
    let(:password){ 'foobar123' }
    let!(:user){ create :user, password: password }

    describe 'authenticate' do
      it 'returns user if email and password are correct' do
        expect(described_class.authenticate(user.email, password)).to eq user
      end

      it 'returns nil if email and password are incorrect' do
        expect(described_class.authenticate(user.email, 'password')).to be_nil
      end
    end
  end
end
