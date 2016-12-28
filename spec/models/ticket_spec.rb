require 'rails_helper'

RSpec.describe Ticket, type: :model do
  it { is_expected.to validate_presence_of(:author) }
  it { is_expected.to validate_presence_of(:name) }

  context 'scopes' do
    describe 'closed_last_month' do
      let!(:ticket1){ create :ticket, :closed, updated_at: Date.current.prev_month.beginning_of_month + 1.day }
      let!(:ticket2){ create :ticket, :closed, updated_at: Date.current.prev_month.beginning_of_month + 2.days }
      let!(:ticket3){ create :ticket, :closed, updated_at: Date.current.next_month.beginning_of_month + 1.day }
      subject { described_class.closed_last_month }
      it { is_expected.to eq [ticket1, ticket2] }
    end
  end
end
