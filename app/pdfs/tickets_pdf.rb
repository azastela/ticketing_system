class TicketsPdf < Prawn::Document
  attr_reader :tickets

  def initialize
    @tickets = Ticket.closed_last_month
    super(top_margin: 70)
    header
    tickets_table
    footer
  end

  def last_month_string
    "#{Date::MONTHNAMES[Date.current.prev_month.month]}, #{Date.current.prev_month.year}"
  end

  def header
    text "Tickets closed in #{last_month_string}", size: 30, style: :bold
  end

  def tickets_table
    if tickets.present?
      move_down 20
      table ticket_rows do
        row(0).font_style = :bold
        columns(1..4).align = :right
        self.row_colors = ['DDDDDD', 'FFFFFF']
        self.header = true
      end
    end
  end

  def ticket_rows
    [["Name", "Author", "Created At", "Closed By", "Closed At"]] +
    tickets.map do |ticket|
      [
        ticket.name,
        ticket.author.email,
        ticket.created_at.strftime('%e %b, %Y'),
        ticket.assigned_to.try(:email),
        ticket.updated_at.strftime('%e %b, %Y')
      ]
    end
  end

  def footer
    move_down 20
    footer_text = if tickets.present?
      "#{tickets.count} ticket(s) were closed in #{last_month_string}"
    else
      "No tickets were closed last month"
    end
    text footer_text, size: 16, style: :bold
  end
end
