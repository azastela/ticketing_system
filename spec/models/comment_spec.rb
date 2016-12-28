require 'rails_helper'

RSpec.describe Comment, type: :model do
  it { is_expected.to validate_presence_of(:content) }
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:ticket) }
  it { is_expected.to validate_length_of(:content).is_at_most(1000).is_at_least(1) }
end
