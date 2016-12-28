json.ticket @ticket, partial: '/api/v1/tickets/ticket', as: :ticket
json.authors @authors, partial: '/api/v1/users/user', as: :user
json.agents @agents, partial: '/api/v1/users/user', as: :user
