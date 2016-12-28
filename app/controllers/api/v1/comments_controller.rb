module Api::V1
  class CommentsController < BaseController

    def index
      @comments = ticket.comments
    end

    def create
      @comment = Comment.new(comment_params)
      authorize @comment
      @comment.user = current_user
      @comment.ticket = ticket
      @comment.save!
      @comments = ticket.comments
      render 'api/v1/comments/index'
    end

    def destroy
      @comment = Comment.find(params[:id])
      authorize @comment
      @comment.destroy
    end

    private

    def ticket
      @ticket ||= Ticket.find(params[:ticket_id])
    end

    def comment_params
      params.require(:comment).permit(:content)
    end
  end
end
