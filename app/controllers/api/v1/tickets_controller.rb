module Api::V1
  class TicketsController < BaseController
    before_action :set_ticket, only: %i(show update destroy)
    before_action :set_authors_and_agents, only: %i(show new),
      if: Proc.new { current_user.admin? || current_user.agent? }
    before_action :authorize_ticket, except: %i(index create new report)

    def index
      authorize Ticket
      @tickets = policy_scope(Ticket)
    end

    def show
    end

    def new
      @ticket = Ticket.new
      authorize @ticket
      render 'api/v1/tickets/show'
    end

    def create
      @ticket = Ticket.new(ticket_params)
      authorize @ticket
      @ticket.author = current_user if current_user.customer?
      @ticket.save!
    end

    def update
      @ticket.update!(ticket_params)
    end

    def destroy
      @ticket.destroy
    end

    def report
      authorize Ticket
      send_data TicketsPdf.new.render,
                filename: "tickets.pdf",
                disposition: 'inline'
    end

    private

    def set_ticket
      @ticket = Ticket.find(params[:id])
    end

    def authorize_ticket
      authorize @ticket
    end

    def set_authors_and_agents
      @authors = User.customer + [current_user]
      @agents = current_user.agent? ? [current_user] : User.agent
    end

    def ticket_params
      params.require(:ticket).permit(
        :name, :description, :status, :author_id, :assigned_to_id)
    end
  end
end
