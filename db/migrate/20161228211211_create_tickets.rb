class CreateTickets < ActiveRecord::Migration[5.0]
  def change
    create_table :tickets do |t|
      t.string :name
      t.text :description
      t.integer :status, default: 0, null: false
      t.references :author, index: true, null: false, foreign_key: {to_table: :users}
      t.references :assigned_to, index: true, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
