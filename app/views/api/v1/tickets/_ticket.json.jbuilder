json.merge! ticket.attributes
json.author_email ticket.author.email if ticket.author
json.assigned_to_email ticket.assigned_to.email if ticket.assigned_to
json.comments ticket.comments, partial: '/api/v1/comments/comment', as: :comment
